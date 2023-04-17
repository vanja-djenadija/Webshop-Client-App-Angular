import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationModalComponent} from "../confirmation-modal/confirmation-modal.component";
import {ProductService} from "../../services/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent {
  @Input() deleteButton: boolean = false;
  @Input() id: number | undefined;
  @Input() name: string = 'Product Name';
  @Input() price: number = 1;

  // TODO: Remove this hardcoded URL
  @Input() imageUrl: string = 'https://firebasestorage.googleapis.com/v0/b/webshop-image.appspot.com/o/No%20Product%20Image%20Available.png?alt=media&token=3b3b810f-7253-4403-b565-fd3739c6ab06';


  constructor(private dialog: MatDialog, private productService: ProductService, private snackBar: MatSnackBar,
              private router: Router) {
  }

  deleteProduct() {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: {
        message: 'Are you sure you want to delete this product?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm') {
          if (this.id != null) {
            this.productService.deleteProduct(this.id).subscribe({
              next: () => {
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                  this.router.navigate(['profile']).then(() => console.log('Navigation complete.'));
                });
              },
              error: (error: any) => {
                this.snackBar.open('An error occurred!' + error, undefined, {duration: 2000});
                console.log(error);
              },
              complete: () => {
                this.snackBar.open('Product successfully deleted.', undefined, {duration: 2000});
                console.log('Delete product with id: ' + this.id);
              }
            });
          }
        }
      }
    );
  }
}
