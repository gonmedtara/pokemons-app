import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as PouchDB from 'pouchdb';
import {isUndefined} from "util";

@Injectable()
export class ABSDispatcherService {
  public db:any; // init dataBase
  public url:any; // init url
  public headers:any = new Headers({'Content-Type': 'application/json'}); // set headers


  constructor(private http:Http) {
  }

  init(dataBaseName, remoteUrl) {
    //create database to this object
    this.url = remoteUrl;
    this.db = new PouchDB(dataBaseName);
    //get infos about this object db to check
    this.db.info().then(function (info) {
      console.info(dataBaseName, "- info", info);
    });
  }

  add(newObject) {
    this.postToDataBase(newObject); //add to data base
    if (navigator.onLine) { //check network connection
      console.log("is online !");
      this.httpPost(newObject); //post to Remote server
    } else {
      this.httpPost(newObject); //post to Remote server
      console.log("is offline !");
      this.archiveOfflineRequest("add", newObject, 0, this.url)
    }
  }

  getAll() {
    return this.getAllFromDataBase();
  }

  getByid() {
  }

  put() {
  }

  delete() {
  }


  // POST
  postToDataBase(newObject) {
    this.db.post(newObject, function (err, response) {
      if (err) {
        return console.log(err);
      }
    });
  }

  httpGetAll(newObject) {
    return this.http.get(this.url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // GET
  getAllFromDataBase() {
    return this.db.allDocs({
        include_docs: true
      }, function (err, results) {
        if (err) {
          console.error(err);
        }
      }
    )
  }

  httpPost(newObject) {
    return this.http
      .post(this.url, JSON.stringify(newObject), this.headers)
      .toPromise()
      .then((response) => console.log(response))
      .catch(this.handleError);
  }

  // function to archive offline request
  archiveOfflineRequest(operation, object, id, url) {
    var id_op = isUndefined(id) ? 0 : id;
    var open = indexedDB.open("AchivesOffline", 1);

    // Create the schema
    open.onupgradeneeded = function () {
      var db = open.result;
      var store = db.createObjectStore("AchivesOfflineCatalog", {autoIncrement: true});
    };

    open.onsuccess = function () {
      // Start a new transaction
      var db = open.result;
      var tx = db.transaction("AchivesOfflineCatalog", "readwrite");
      var store = tx.objectStore("AchivesOfflineCatalog");
      // Add some data
      store.put({operation: operation, object: object, id_op: id_op, url: url});
      // Close the db when the transaction is done
      tx.oncomplete = function () {
        db.close();
      };
    };
  }

  private handleError(error:any):Promise<any> {
    console.error('Erreur : ', error); // on affiche simplement le message de l'erreur dans la console...
    return Promise.reject(error.message || error);
  }
}
