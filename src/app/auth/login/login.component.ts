import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {LoginRequest} from 'src/app/model/login-request.model';
import {AuthService} from '../services/auth.service';
import {TokenStorageService} from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  ngOnInit(): void {
    if (this.tokenStorage.getJwt() && this.tokenStorage.getUser()) {
      this.router.navigate(['home']).then(() => {
      });
    }
  }

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login() {
    const request: LoginRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    this.authService.login(request).subscribe({
      next: (response: any) => {
        console.log(response); // TODO: Delete
        if (response != null) {
          this.tokenStorage.storeJwt(response.token);
          this.tokenStorage.storeRefreshToken(response.refreshToken);
          this.tokenStorage.storeUser(response);
          this.router.navigate(['']).then(() => {
          });
        } else {
          this.snackBar.open('Please activate account first.', undefined, {duration: 2000})
          this.router.navigate(['auth/activate']).then(() => {
          });
        }
      },
      error: (error: any) => {
        if (error.status === 401) {
          this.snackBar.open('Invalid credentials.', undefined, {duration: 2000});
        } else {
          this.snackBar.open('An error occurred!', undefined, {duration: 2000});
        }
      },
      complete: () => {
        this.loginForm.reset();
        this.tokenStorage.updateHttpOptions();
      }
    });
  }
}
