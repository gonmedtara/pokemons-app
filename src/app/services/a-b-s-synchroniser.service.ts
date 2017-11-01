import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import * as PouchDB from 'pouchdb';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ABSSynchroniserService {
  public archives:any;
  public headers:any = new Headers({'Content-Type': 'application/json'}); // set headers

  constructor(private http:Http) {
  }

  sync() {
    this.getArchives().then((docs) => {
      var all_contents:any=[];
      docs.rows.forEach(
        function (archive) {
          all_contents.push(archive.doc)
        });
      all_contents.sort(function (a, b) {
        return a.sec - b.sec;
      });
      this.operationDispatcher(all_contents, this.http, this.headers, this.handleError);
    });
  }

  getArchives() {
    this.archives = new PouchDB("achives-offline");
    return this.archives.allDocs({
        include_docs: true
      }, function (err, results) {
        if (err) {
          console.error(err);
        }
      }
    );
  }

  operationDispatcher(all_contents:any, http:any, headers:any, handleError:any) {
    if (all_contents.length > 0) {
      all_contents.forEach(
        function (archive) {
          console.log(archive);
          switch (archive.operation) {
            case ("add"):
              http.post(archive.url, JSON.stringify(archive.object), headers)
                .toPromise()
                .then((response) => console.log('Syncronise :', response))
                .catch(handleError);
              break;
            case ("put"):
              http.put(archive.url + "/" + archive.id_op, JSON.stringify(archive.object), headers)
                .toPromise()
                .then((response) => console.log('Syncronise :', response))
                .catch(handleError);
              break;
            case ("delete"):
              http.delete(archive.url + "/" + archive.id_op, headers)
                .toPromise()
                .then((response) => console.log('Syncronise :', response))
                .catch(handleError);
              break;
            case ("upload"):
              console.log("upload element !");
              break;
            default:
              console.log("nothing to do !");
          }
        }
      );
      this.archives.destroy();
    }
    else {
      console.log("nothing to synchronize !")
    }
  }

  private handleError(error:any):Promise<any> {
    console.error('Erreur : ', error); // on affiche simplement le message de l'erreur dans la console...
    return Promise.reject(error.message || error);
  }


}
