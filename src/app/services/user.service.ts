import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Observable<User> {
    const user = this.http.get<User>('http://localhost:3000/users', {
      params: { email },
    });
    if (user) {
      return user;
    } else {
      throw new Error('User not found');
    }
  }

  register({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', {
      name,
      email,
      password,
    });
  }
}
