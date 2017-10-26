import {User} from '../interfaces/user';

export const USERS: User[] = [
  {
    id:100,
    name: {
      first: 'admin',
      last: 'ADMIN'
    },
    email: 'admin@sifast.com',
    verification: {
      password: 'admin100',
      passwordConfirm: 'admin100'
    }
  },
  {
    id:0,
    name: {
      first: 'Mohamed',
      last: 'GONTARA'
    },
    email: 'mohamed.gontara@sifast.com',
    verification: {
      password: 'medmed20',
      passwordConfirm: 'medmed20'
    }
  },
  {
    id:1,
    name: {
      first: 'Mohamed',
      last: 'BOUAZIZ'
    },
    email: 'mohamed.bouaziz@sifast.com',
    verification: {
      password: 'medmed20',
      passwordConfirm: 'medmed20'
    }
  }
];
