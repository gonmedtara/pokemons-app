import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as PouchDB from 'pouchdb';
import * as PouchDbFind from 'pouchdb-find';
import {isUndefined} from "util";
PouchDB.plugin(PouchDbFind);

@Injectable()
export class ABSFileStoreService {
  private db:any; // init dataBase

  constructor() {
    this.db = new PouchDB('files-store', {auto_compaction: true});
    this.db.put({
      _id: 'store',
      _attachments: {}
    }).then(function (response) {
      console.log("Init store", response);
    }).catch(function (err) {
      console.log(err);
    });
  }

  saveFileAsAtt(blob, attId) {
    return this.db.get('store',{attachments: true}).then((doc)=>{
      doc._attachments[attId] = {
        content_type: blob.type,
        data: blob
      };
      this.db.put(doc).catch(function (err) {
        console.log(err);
      });
    }).catch(function (err) {
      console.log(err);
    });
  }

  getAllFiles() {
    return this.db.get('store', {attachments: true,binary: true}).then(function (doc) {
      console.log(doc);
      return doc._attachments;
    });
  }


  getFileAsAtt(attchId) {
    this.db.getAttachment('store', attchId).then(function (blobOrBuffer) {
      console.log(blobOrBuffer);
    }).catch(function (err) {
      console.log(err);
    });
  }

  deleteFileAsAtt(attchId) {
    this.db.removeAttachment('store', attchId).then(function (result) {
      console.log(result);
    }).catch(function (err) {
      console.log(err);
    });
  }
}
