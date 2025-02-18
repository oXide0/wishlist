import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

interface RegisterForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    RouterLink,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup<RegisterForm>;

  constructor(private router: Router, private userService: UserService) {
    this.registerForm = new FormGroup<RegisterForm>({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)],
        nonNullable: true,
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        nonNullable: true,
      }),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.getRawValue());
      this.userService.register(this.registerForm.getRawValue()).subscribe(
        (user) => {
          console.log('User registered', user);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error registering user', error);
        }
      );
    }
  }
}
