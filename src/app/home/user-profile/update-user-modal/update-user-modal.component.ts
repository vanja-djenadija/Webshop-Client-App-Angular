import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {User} from 'src/app/model/user.model';
import {FileUploadService} from 'src/app/services/file-upload.service';
import {UserService} from 'src/app/services/user.service';
import {CustomerSupportModalComponent} from '../../customer-support-modal/customer-support-modal.component';
import {UserUpdateRequest} from "../../../model/user-update-request.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TokenStorageService} from "../../../auth/services/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-user-modal',
  templateUrl: './update-user-modal.component.html',
  styleUrls: ['./update-user-modal.component.css']
})
export class UpdateUserModalComponent implements OnInit {
  public updateProfileForm: FormGroup;
  selectedFile: File | null = null;
  firebaseImageURL: string = '';
  newHide = true;
  hide = true;
  newPassword!: String;
  email = new FormControl('', [Validators.required, Validators.email]);
  @Input() user: User | null = null;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<CustomerSupportModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService,
              private uploadService: FileUploadService,
              private tokenService: TokenStorageService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.updateProfileForm = formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      password: [null, Validators.required],
      newPassword: [null, Validators.required],
      email: [null, Validators.required],
      city: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      avatarUrl: [null, Validators.required],
    });
  }

  ngOnInit() {
    if (this.user) {
      this.updateProfileForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        city: this.user.city,
        email: this.user.email,
        phoneNumber: this.user.phoneNumber,
        avatarUrl: this.user.avatarUrl
      });
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  selectFile(event: any): void {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile != null) {
      this.uploadService.uploadFile(this.selectedFile).subscribe({
        next: (downloadURL: any) => {
          console.log('File uploaded successfully! Download URL:', downloadURL);
          this.firebaseImageURL = downloadURL;
        },
        error: (error: any) => {
          console.error('Error uploading file:', error);
        }
      });
    }
  }

  updateProfile(): void {

    const request: UserUpdateRequest = {
      firstName: this.updateProfileForm.value.firstName,
      lastName: this.updateProfileForm.value.lastName,
      password: this.updateProfileForm.value.password,
      newPassword: this.updateProfileForm.value.newPassword,
      city: this.updateProfileForm.value.city,
      email: this.updateProfileForm.value.email,
      phoneNumber: this.updateProfileForm.value.phoneNumber,
      avatarUrl: this.selectedFile ? this.firebaseImageURL : this.user!.avatarUrl
    }

    this.tokenService.updateHttpOptions();

    this.userService.update(request).subscribe({
      next: (response: User) => {
        this.tokenService.updateUser(response);
      },
      error: (error: any) => {
        this.snackBar.open('An error occurred!' + error, undefined, {duration: 2000});
        console.log(error);
      },
      complete: () => {
        this.snackBar.open('Profile successfully updated.', undefined, {duration: 2000});
        this.cancel();
        this.selectedFile = null;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['profile']).then(() => {
          });
        });
      }
    })

  }

  cancel(): void {
    this.dialogRef.close();
  }
}
