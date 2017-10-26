import {Injectable} from '@angular/core';
import {UsersService} from './users.service';
import {User} from '../interfaces/user';
import '../rxjs-extension.ts';

@Injectable()
export class AuthService {
  isLoggedIn:boolean = false; // L'utilisateur est-il connecté ?
  redirectUrl:string;
  checkAuth:boolean = false;
  users:User[]; // où rediriger l'utilisateur après l'authentification ?
  constructor(private usersService:UsersService) {
  }

  // Une méthode de connexion
   login(loginData:any):any {
    return this.checkUser(loginData).then((bol)=>{
      this.isLoggedIn = bol;
    });
  }

  // Une méthode de déconnexion
  logout():void {
    this.isLoggedIn = false;
  }

  checkUser(loginData:any):any {
   return this.usersService.getUsers()
      .then(users => this.users = users)
      .then(()=> {
          if (this.users ) {
            for (let i = 0; i < this.users.length; i++) {
              if (this.users[i].email == loginData.email && this.users[i].verification.password == loginData.password) {
                this.checkAuth = true;
              }
            }
          }
        }
      ).then(()=> {
      return this.checkAuth;
    });

  }
}
