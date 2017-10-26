export interface User {
  id?:number,
  name :{
    first:string;
    last:string;
  }
  email :string;
  verification :{
    password :string;
    passwordConfirm :string;
  }
}
