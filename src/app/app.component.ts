import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import {ABSDispatcherService} from './services/a-b-s-dispatcher.service';
import {ABSSynchroniserService} from './services/a-b-s-synchroniser.service';
import {NetworkCheckStatusService} from './services/network-check-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public db:any;
  public isOnline:any;
  public pok:any;

  constructor(public snackBar:MatSnackBar,
              private networkCheckStatusService:NetworkCheckStatusService,
              private aBSDispatcherService:ABSDispatcherService,
              private aBSSynchroniserService:ABSSynchroniserService,
              private router:Router,
              private authService:AuthService) {}

  ngOnInit() {
    console.log('ngOnInit !');
    this.aBSDispatcherService.init("pokemon", "app/pokemons");

    window.addEventListener("online", () => {
      this.aBSSynchroniserService.sync();
      this.snackBar.open('You are online. All data is synced.', 'Ok', {duration: 3000});
    }, false);
    window.addEventListener("offline",  () => {
      this.snackBar.open('You are offline. All changes will be synced when you will go online again.', 'Close');
    }, false);
  }

  putInDataBase() {
    this.aBSDispatcherService.add({
      id: 300,
      name: "GONTARA",
      hp: 21,
      cp: 4,
      picture: "http://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
      types: [
        "Eau"
      ],
      created: "2017-10-23T10:23:10.823Z"
    });
    this.getAll();
  }

  getAll(){
   this.aBSDispatcherService.getAll().then(
     (data)=>{
         var docs = data.rows.map(
           function (row) {
             return ( row.doc )
           }
         );
       console.table(docs);
     }
   );

  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
