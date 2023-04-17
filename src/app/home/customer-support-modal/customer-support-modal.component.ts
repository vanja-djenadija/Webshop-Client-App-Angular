import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageRequest } from 'src/app/model/message-request.model';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-customer-support-modal',
  templateUrl: './customer-support-modal.component.html',
  styleUrls: ['./customer-support-modal.component.css']
})
export class CustomerSupportModalComponent implements OnInit {

  content: string = '';
  @Input() userId: number | undefined;

  constructor(public dialogRef: MatDialogRef<CustomerSupportModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageService,
    private snackBar: MatSnackBar) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    // TODO:
  }

  sendMessage() {
    const request: MessageRequest = {
      content: this.content,
      userId: this.userId!
    }

    this.messageService.sendMessage(request).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.snackBar.open('Message successfully sent.', undefined, { duration: 2000 });
        this.dialogRef.close();
      }
    });


  }

  cancel() {
    this.dialogRef.close();
  }
}
