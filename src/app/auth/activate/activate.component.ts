import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {
  activateForm: FormGroup;

  ngOnInit(): void { /* TODO document why this method 'ngOnInit' is empty */ }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.activateForm = formBuilder.group({
      username: [null, Validators.required],
      pin: [null, Validators.required]
    });
  }

  activate() {
    this.authService.activateAccount(this.activateForm.value.pin, this.activateForm.value.username).subscribe({
      next: (response) => {
        console.log(response); // TODO: Delete
        if (response === null) {
          this.snackBar.open('Invalid data provided!', undefined, { duration: 2000 })
        } else {
          this.snackBar.open('Account activated sucessfully! You can log in now.', undefined, {
            duration: 4000,
          });
          this.router.navigate(['auth/login']);
        }
      },
      error: (error: any) => {
        this.snackBar.open('An error occured!', undefined, { duration: 2000 });
      },
      complete: () => {
        this.activateForm.reset();
      }
    });
  }
}
