import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as PouchDB from 'pouchdb';
import * as PouchDbFind from 'pouchdb-find';
import {isUndefined} from "util";
PouchDB.plugin(PouchDbFind);


@Injectable()
export class ABSDispatcherService {
  private db:any; // init dataBase
  private url:any; // init url
  private headers:any = new Headers({'Content-Type': 'application/json'}); // set headers
  private dbName:any;


  constructor(private http:Http) {

  }

  init(dataBaseName, remoteUrl) {
    //create database to this object
    this.dbName = dataBaseName;
    this.url = remoteUrl;
    this.db = new PouchDB(dataBaseName, {auto_compaction: true});
    //get infos about this object db to check
    this.db.info().then(function (info) {
      console.info(dataBaseName, "- info", info);
    });
  }

  add(newObject) {
    this.postToDataBase(newObject); //add to data base
    if (navigator.onLine) { //check network connection
      this.httpPost(newObject); //post to Remote server
    } else {
      this.archiveOfflineRequest("add", newObject, 0, this.url, new Date().valueOf());
    }
  }

  getAll() {
    if (navigator.onLine) { //check network connection
      return this.httpGetAll()
    } else {
      return this.getDocs()
    }
  }

  getById(id:number) {
    if (navigator.onLine) { //check network connection
      return this.httpGetById(id);
    } else {
      return this.getByIdFromDataBase(id).then(response => response.docs[0]);
    }
  }

  put(newObject:any) {
    if (navigator.onLine) { //check network connection
      this.putToDataBase(newObject); //add to data base
      return this.httpPut(newObject); //put to Remote server
    } else {
      this.archiveOfflineRequest("put", newObject, newObject.id, this.url, new Date().valueOf());
      return this.putToDataBase(newObject); //add to data base
    }
  }

  delete(id:number) {
    if (navigator.onLine) { //check network connection
      this.deleteFromDataBase(id); //add to data base
      return this.httpDelete(id); //put to Remote server
    } else {
      this.archiveOfflineRequest("delete", {}, id, this.url, new Date().valueOf());
      return this.deleteFromDataBase(id); //add to data base
    }
  }

  // POST
  postToDataBase(newObject) {
    this.db.post(newObject, function (err, response) {
      if (err) {
        return console.log(err);
      }
    });
  }

  httpPost(newObject) {
    return this.http
      .post(this.url, JSON.stringify(newObject), this.headers)
      .toPromise()
      .then((response) => console.log(response))
      .catch(this.handleError);
  }

  // GET ALL
  getAllFromDataBase() {
    // this.db.info().then(function (info) {
    //   console.info("0- info", info);
    // });
    return this.db.allDocs({
        include_docs: true
      }, function (err, results) {
        if (err) {
          console.error(err);
        }
      }
    )
  }

  getDocs() {
    return this.getAllFromDataBase().then((datas)=> {
      let docs = [];
      datas.rows.forEach(
        function (data) {
          docs.unshift(data.doc)
        });
      return docs;
    })
  }

  httpGetAll() {
    console.log("call http method");
    return this.http.get(this.url)
      .toPromise()
      .then((objects) => {
        this.db.allDocs().then((result) => {
          // Promise isn't supported by all browsers; you may want to use bluebird
          return Promise.all(result.rows.map((row) => {
            return this.db.remove(row.id, row.value.rev, {force: true});
          }));

        }).then(()=> {
          Promise.all(
            objects.json().map((object) => {
            return this.db.post(object, {force: true});
          }));
        }).catch(function (err) {
          console.info("err :", err);
        })
        return objects.json();
      }).catch(this.handleError);

  }

  // GET BY ID
  getByIdFromDataBase(id:number) {
    return this.db.find({
      selector: {id: id}
    }, function (err, result) {
      if (err) {
        return console.log(err);
      }
    });
  }

  httpGetById(id:number) {
    var url = `${this.url}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  //PUT
  putToDataBase(newObject:any) {
    return this.getByIdFromDataBase(newObject.id)
      .then((response) => {
        if (response.docs[0]) {
          var oldEl = response.docs[0];
          newObject._id = oldEl._id;
          newObject._rev = oldEl._rev;
          this.db.put(newObject, {allow_conflict: true}, function (err, response) {
            if (err) {
              return console.log(err);
            } else {
              console.log("Documents Updated Successfully");
            }
          })
        }
      }).then(response => "Updated");
  }

  httpPut(newObject:any) {
    var url = `${this.url}/${newObject.id}`;
    return this.http
      .put(url, JSON.stringify(newObject), this.headers)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  //DELETE
  deleteFromDataBase(id:number) {
    return this.getByIdFromDataBase(id)
      .then((response) => {
        if (response.docs[0]) {
          var oldEl = response.docs[0];
          oldEl._deleted = true;
          this.db.post([oldEl], {});
        }
      }).then(response => "Deleted");
  }

  httpDelete(id:number) {
    var url = `${this.url}/${id}`;
    return this.http
      .delete(url, this.headers)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  // function to archive offline request
  archiveOfflineRequest(operation, object, id, url, sec) {
    var id_op = isUndefined(id) ? 0 : id;
    var archives = new PouchDB("achives-offline");
    var archiveDoc = {operation: operation, object: object, id_op: id_op, url: url, sec: sec};
    archives.post(archiveDoc, function (err, response) {
      if (err) {
        return console.log(err);
      }
    });
  }

  private handleError(error:any):Promise<any> {
    console.error('Erreur : ', error); // on affiche simplement le message de l'erreur dans la console...
    return Promise.reject(error.message || error);
  }
}
