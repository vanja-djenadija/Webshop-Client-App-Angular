import {Component, Input} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {PurchaseRequest} from "../../../../model/purchase-request.model";
import {TokenStorageService} from "../../../../auth/services/token-storage.service";
import {ProductService} from "../../../../services/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Product} from "../../../../model/product.model";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.css']
})
export class PurchaseModalComponent {

  @Input() productId: number = 0;
  paymentMethod: string = 'cash-on-delivery';
  cardNumber!: number;

  constructor(public dialogRef: MatDialogRef<PurchaseModalComponent>,
              private fb: FormBuilder, private tokenService: TokenStorageService,
              private productService: ProductService,
              private snackBar: MatSnackBar,
              private router: Router) {

  }

  purchase() {
    const request: PurchaseRequest = {
      customerId: this.tokenService.getUser().id
    }

    this.productService.purchase(this.productId, request).subscribe({
      next: (product: Product) => {
        this.snackBar.open('Successfully purchased product.', undefined, {duration: 2000});
        console.log('Purchased product: ', product);
      },
      error: (error: any) => {
        this.snackBar.open('Error occurred!', undefined, {duration: 2000});
        console.log(error);
      },
      complete: () => {
        this.dialogRef.close();
        this.router.navigate(['/products']).then(() => {
        });
      }
    });
  }
}
