import { Component } from '@angular/core';

interface User {
  name: string;
  photo: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public users: User[] = [
    { name: 'Father', photo: 'assets/father.jpg' },
    { name: 'Mother', photo: 'assets/mother.jpg' },
    { name: 'Sister 1', photo: 'assets/sister1.jpg' },
    { name: 'Sister 2', photo: 'assets/sister2.jpg' },
    { name: 'Me', photo: 'assets/me.jpg' },
  ];

  login(user: User) {
    console.log('Logged in as', user.name);
  }
}
