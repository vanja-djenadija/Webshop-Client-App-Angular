import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from 'src/app/auth/services/token-storage.service';
import {CommentRequest} from 'src/app/model/comment-request.model';
import {Product} from 'src/app/model/product.model';
import {ProductService} from 'src/app/services/product.service';
import {MatDialog} from "@angular/material/dialog";
import {PurchaseModalComponent} from "./purchase-modal/purchase-modal.component";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public commentForm: FormGroup;
  currentProduct!: Product;
  imageObject: Array<object> = [];

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              public tokenService: TokenStorageService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
    this.commentForm = formBuilder.group({
      comment: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getProduct(this.route.snapshot.params["id"]);
  }

  getProduct(id: number): void {
    this.productService.getProductById(id)
      .subscribe({
        next: (data) => {
          this.currentProduct = data;
          console.log(data);
          this.createImageObject(this.currentProduct.images);
          console.log(this.imageObject)
        },
        error: (e) => console.error(e)
      });
  }

  createImageObject(images: import("../../../model/image.model").Image[]) {
    images.forEach(img => {
      var slideImage = {
        image: img.imageUrl,
        thumbImage: img.imageUrl,
      };
      this.imageObject.push(slideImage);
    });
  }

  addComment(): void {
    const request: CommentRequest = {
      content: this.commentForm.value.comment,
      dateTime: new Date(),
      productId: this.currentProduct.id,
      userId: this.tokenService.getUser().id
    }

    this.productService.comment(request).subscribe({
      next: (response: any) => {
        if (response != null) {
          /*this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['product', this.currentProduct.id]).then(() => console.log('Navigation complete.'));
          });
        } else {
          console.log("Response is null.");
        }*/
          this.currentProduct.comments.push(response);
        }
      },
      error: (error: any) => {
        this.snackBar.open('An error occurred!' + error, undefined, {duration: 2000});
      },
      complete: () => {
        this.commentForm.reset();
      }
    });
  }

  openPurchaseModal() {
    const modalRef = this.dialog.open(PurchaseModalComponent, {
      width: '400px',
    });
    modalRef.componentInstance.productId = this.currentProduct.id;
  }
}
