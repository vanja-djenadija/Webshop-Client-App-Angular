import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TokenStorageService} from 'src/app/auth/services/token-storage.service';
import {Product, ProductStatus} from 'src/app/model/product.model';
import {User} from 'src/app/model/user.model';
import {ProductService} from 'src/app/services/product.service';
import {UserService} from 'src/app/services/user.service';
import {UpdateUserModalComponent} from './update-user-modal/update-user-modal.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public user: User | null = null;
  activeProducts: Product[] = [];
  soldProducts: Product[] = [];
  purchasedProducts: Product[] = [];
  currentProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    isNew: false,
    status: ProductStatus.ACTIVE,
    location: '',
    createDate: new Date(),
    quantity: 0,
    attributes: [],
    comments: [],
    images: [],
    seller: new User(0, '', '', '', '', '', '', '', ''),
    customer: new User(0, '', '', '', '', '', '', '', '')
  };

  currentIndexActive = -1;
  currentIndexSold = -1;
  currentIndexPurchased = -1;
  name: string = '';
  numberOfActiveProducts = 0;
  numberOfSoldProducts = 0;
  numberOfPurchasedProducts = 0;


  constructor(private tokenService: TokenStorageService, private dialog: MatDialog, private productService: ProductService, private userService: UserService) {
    this.user = tokenService.getUser();
  }

  ngOnInit(): void {
    this.retrieveActiveProducts();
    this.retrieveSoldProducts();
    this.retrievePurchasedProducts();
  }

  editProfile(): void {
    const modalRef = this.dialog.open(UpdateUserModalComponent, {
      width: '30rem'
    });
    modalRef.componentInstance.user = this.user;
  }

  retrieveActiveProducts(): void {
    this.userService.getActiveProductsByUser().subscribe({
      next: (data: any) => {
        this.activeProducts = data.content;
        this.numberOfActiveProducts = data.totalElements;
        console.log(data); // TODO: Delete
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  retrieveSoldProducts(): void {
    this.userService.getSoldProductsByUser().subscribe({
      next: (data: any) => {
        this.soldProducts = data.content;
        this.numberOfSoldProducts = data.totalElements;
        console.log(data);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  retrievePurchasedProducts(): void {
    this.userService.getPurchasedProductsByUser().subscribe({
      next: (data: any) => {
        this.purchasedProducts = data.content;
        this.numberOfPurchasedProducts = data.totalElements;
        console.log(data);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  setActiveProduct(product: Product, index: number): void {
    this.currentProduct = product;
    this.currentIndexActive = index; // TODO cHANGE
  }
}
