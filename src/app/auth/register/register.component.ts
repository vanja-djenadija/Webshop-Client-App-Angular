import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationRequest } from 'src/app/model/registration-request.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  gender!: string;

  ngOnInit(): void { }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: ['', Validators.required, Validators.email],
      phoneNumber: [null, Validators.required],
      city: [null, Validators.required],
      gender: [null, Validators.required],
    });
  }

  register() {
    const request: RegistrationRequest = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      email: this.registerForm.value.email,
      phoneNumber: this.registerForm.value.phoneNumber,
      city: this.registerForm.value.phoneNumber,
      avatarUrl:
        this.registerForm.value === 'male'
          ? "src\assets\images\male.png."
          : "src\assets\images\female.png.",
    };

    this.authService.register(request).subscribe({
      next: () => this.registerForm.reset(),
      error: () =>
        this.snackBar.open('An error occured!', undefined, { duration: 2000 }),
      complete: () =>
        this.snackBar.open('Account created sucessfully! PIN has been sent to your e-mail. Please activate account.', undefined, {
          duration: 4000,
        }),
    });
  }
}
