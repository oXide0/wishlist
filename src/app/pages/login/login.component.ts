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
    { name: 'Father', photo: 'father.webp' },
    { name: 'Mother', photo: 'mother.webp' },
    { name: 'Sister 1', photo: 'katia.webp' },
    { name: 'Sister 2', photo: 'maria.webp' },
    { name: 'Me', photo: 'nazar.webp' },
  ];

  login(user: User) {
    console.log('Logged in as', user.name);
  }
}
