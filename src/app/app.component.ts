import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
// import { ConnectivityService } from 'ng-http-sw-proxy';
import {AuthService} from './services/auth.service';
// import * as PouchDB from 'pouchdb';

import * as minimongo from 'minimongo';
var LocalDb = minimongo.MemoryDb;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public db:any;

  constructor(public snackBar:MatSnackBar,
              // private conn: ConnectivityService,
              private router:Router,
              private authService:AuthService) {
    this.initialiseDB();

    // this.db.info().then(function (info) {
    //   console.info("db- info",info);
    // });
  }

  ngOnInit() {
    console.log('ngOnInit !');
    // this.initialiseDB();
    // var db = new PouchDB('http://localhost:5984/pokemons/_all_docs');
    // this.db = new PouchDB('pokemons');
    //
    //
    // let isOnline:boolean = true;
    // this.conn.hasNetworkConnection()
    //   .filter((status:boolean) => status !== isOnline)
    //   .debounceTime(1000)
    //   .subscribe((status:boolean) => {
    //     isOnline = status;
    //     if (status === false) {cd..
    //       this.snackBar.open('You are offline. All changes will be synced when you will go online again.', 'Close');
    //     } else {
    //       this.snackBar.open('You are online. All data is synced.', 'Ok', {duration: 3000});
    //     }
    //   })
  }

  initialiseDB() {
    //   this.db = new PouchDB('pokemons');
    //   var sync = PouchDB.sync('pokemons', 'http://127.0.0.1:3000/pokemons', {
    //     live: true,
    //     retry: true
    //   }).on('change', function (info) {
    //     console.log("change :", info);
    //   });
    //
    //   this.db.info().then(function (info) {
    //     console.info("db- info", info);
    //   });
    //
    this.db = new LocalDb();
    this.db.addCollection("animals");
  }

  putInDataBase() {
    //   this.db.post(
    //   {
    //     id: 1001,
    //       name: "gontara",
    //     hp: 25,
    //     cp: 5,
    //     picture: "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/035.png",
    //     types: [
    //     "Fée"
    //   ],
    //     created: "2017-10-23T10:23:10.823Z"
    //   }
    //   , function (err, response) {
    //     if (err) {
    //       return console.log(err);
    //     }
    //     // handle response
    //   });
    let doc = {species: "dog", name: "Bingo"};
    this.db.animals.upsert(doc, function () {
      // Success:

      // Query dog (with no query options beyond a selector)
      this.db.animals.findOne({species: "dog"}, {}, function (res) {
        console.log("Dog's name is: " + res.name);
      });
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openSnackBar(message:string) {
    this.snackBar.open(message, 'Undo');
  }
}
