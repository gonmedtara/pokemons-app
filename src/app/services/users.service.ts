import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from '../interfaces/user';

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  getUsers(): Promise<User[]> {
    return this.http.get('app/users')
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  addUser(user: User): Promise<User> {
    const url = `app/users`;
    let headers:any = new Headers({'Content-Type': 'application/json'}); // set headers
    return this.http
      .post(url, JSON.stringify(user), headers)
      .toPromise()
      .then((response) => console.log("add response",response))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Erreur : ', error); // on affiche simplement le message de l'erreur dans la console...
    return Promise.reject(error.message || error);
  }
}
