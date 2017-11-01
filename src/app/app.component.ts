import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import {ABSSynchroniserService} from './services/a-b-s-synchroniser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(public snackBar:MatSnackBar,
              private aBSSynchroniserService:ABSSynchroniserService,
              private router:Router,
              private authService:AuthService) {
  }

  ngOnInit() {
    console.log('ngOnInit !');

    window.addEventListener("online", () => {
      this.aBSSynchroniserService.sync();
      this.snackBar.open('You are online. All data is synced.', 'Ok', {duration: 3000});
    }, false);
    window.addEventListener("offline", () => {
      this.snackBar.open('You are offline. All changes will be synced when you will go online again.', 'Close');
    }, false);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
