import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {AuthService} from '../../services/auth.service';
import {User} from '../../interfaces/user';
import {confPasswordValidator} from '../../confirmation-password.validator';
import {UsersService} from '../../services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public user:User;
  public userT:User;
  public users:User[];
  public formAdd:FormGroup;
  public formLogin:FormGroup;

  validationMessages:any = {
    'name': {
      'first': {
        'required': 'First name is required.',
        'minlength': 'Minimum 3 characters'
      },
      'last': {
        'required': 'Last name is required.',
        'minlength': 'Minimum 3 characters'
      }
    },
    'email': {
      'required': 'E-mail is required.',
      'pattern': 'E-mail Invalid'
    },
    'verification': {
      'password': {
        'required': 'password is required.',
        'minlength': 'Minimum 8 characters'
      },
      'passwordConfirm': {
        'required': 'Confirme password is required.',
        'minlength': 'Minimum 8 characters',
        'validateEqual': 'password not the same'
      }
    }
  };

  constructor(
    private authService:AuthService,
    private router:Router,
    private fb:FormBuilder,
    private usersService:UsersService,
    public snackBar: MatSnackBar) {
  }

  ngOnInit():void {
    this.formAdd = this.fb.group({
      name: this.fb.group({
        first: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])],
        last: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])]
      }),
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$')
        ])],
      verification: this.fb.group({
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8)
          ])],
        passwordConfirm: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            confPasswordValidator()
          ])
        ]
      })
    });
    this.formLogin = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$')
        ])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])]
    });

    this.user = {
      name: {
        first: '',
        last: ''
      },
      email: '',
      verification: {
        password: '',
        passwordConfirm: ''
      }
    };
    this.formAdd.setValue(this.user);
  }

  addUser(model:User, isValid:boolean) {
    model.id = (new Date().valueOf()) * 10000;
    this.usersService.addUser(model);
  }

  login(model:any, isValid:boolean) {
    this.authService.login(model).then(() => {
      if (this.authService.isLoggedIn) {
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/pokemon/all';
        this.router.navigate([redirect]);
      }
      else {
        this.openSnackBar('User not found','Undo');
      }
    });
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
