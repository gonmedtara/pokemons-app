import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ABSSynchroniserService {
  public archives:any;
  public headers:any = new Headers({'Content-Type': 'application/json'}); // set headers

  constructor(private http:Http) {
  }

  sync() {
    this.getArchives(this.handleError,this.http,this.headers);
  }

  getArchives(handleError,http,headers) {
    let all_content = [];
    var open = indexedDB.open("AchivesOffline", 1);

    // Create the schema
    open.onupgradeneeded = function () {
      var db = open.result;
      var store = db.createObjectStore("AchivesOfflineCatalog", {autoIncrement: true});
    };


    open.onsuccess = function () {
      // Start a new transaction
      var db = open.result;
      var tx = db.transaction("AchivesOfflineCatalog", "readonly");
      var store = tx.objectStore("AchivesOfflineCatalog");
      var request = store.openCursor();

      var getAllContent = store.getAll();

      getAllContent.onsuccess = function () {
        if (getAllContent.result) {
          all_content = getAllContent.result;
          if (all_content.length > 0) {
            all_content.forEach(
              function (archive) {
                console.log(archive);
                switch (archive.operation) {
                  case ("add"):
                    return http
                      .post(archive.url, JSON.stringify(archive.object), headers)
                      .toPromise()
                      .then((response) => console.log('Syncronise :',response))
                      .catch(handleError);
                  case ("get"):
                    console.log("get element !");
                  case ("put"):
                    console.log("put element !");
                  case ("delete"):
                    console.log("delete element !");
                  case ("upload"):
                    console.log("upload element !");
                  default:
                    console.log("nothing to do !");
                }
              }
            );
          }
          else {
            console.log("nothing to synchronize !")
          }
        }
      };
    };
    indexedDB.deleteDatabase('AchivesOffline')
  }
  private handleError(error:any):Promise<any> {
    console.error('Erreur : ', error); // on affiche simplement le message de l'erreur dans la console...
    return Promise.reject(error.message || error);
  }


}
