import {Injectable} from '@angular/core';

@Injectable()
export class CacheStorageService {

  constructor() {
  }

  saveImage(imgOriginalOut: any, id:any) {

    var open = indexedDB.open("MyImageStore", 1);

    // Create the schema
    open.onupgradeneeded = function () {
      var db = open.result;
      var store = db.createObjectStore("MyImageCatalog", {autoIncrement: true});
      var index = store.createIndex("Images", "id");
    };

    open.onsuccess = function () {
      // Start a new transaction
      var db = open.result;
      var tx = db.transaction("MyImageCatalog", "readwrite");
      var store = tx.objectStore("MyImageCatalog");
      var index = store.index("Images");

      // delete old data by id !
      store.delete(id);
      // Add some data
      store.put({id: id, imageString: imgOriginalOut});
      // Close the db when the transaction is done
      tx.oncomplete = function () {
        db.close();
      };
    };
  }

  getImage(imgOriginal: any,id:any) {
    let imageFromIxDB: string = imgOriginal;
    var open = indexedDB.open("MyImageStore", 1);

    // Create the schema
    open.onupgradeneeded = function () {
      var db = open.result;
      var store = db.createObjectStore("MyImageCatalog", {autoIncrement: true});
      var index = store.createIndex("Images", "id");
    };

    open.onsuccess = function () {
      // Start a new transaction
      var db = open.result;
      var tx = db.transaction("MyImageCatalog", "readwrite");
      var store = tx.objectStore("MyImageCatalog");
      var index = store.index("Images");

      var getImage = store.get(1);

      getImage.onsuccess = function () {
        if (getImage.result) {
          console.log(" getImageResult ", getImage.result.imageString);
          imageFromIxDB = getImage.result.imageString;
        }
      };
      // Close the db when the transaction is done
      tx.oncomplete = function () {
        db.close();
      };
    };
    return imageFromIxDB;
  }
}
