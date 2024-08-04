import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  getUsers(): User[] {
    const users = localStorage.getItem('users');
    if (users) {
      return Array.from(JSON.parse(users));
    }

    return Array<User>();
  }

  setUsers(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  deleteUsers() {
    localStorage.removeItem('users')
  }
}
