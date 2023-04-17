import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {TokenStorageService} from 'src/app/auth/services/token-storage.service';
import {User} from 'src/app/model/user.model';
import {CustomerSupportModalComponent} from '../customer-support-modal/customer-support-modal.component';
import {AddProductComponent} from "../add-product/add-product.component";


@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent {
  user: User | null = null;

  constructor(private tokenService: TokenStorageService, private dialog: MatDialog, private router: Router) {
    this.user = tokenService.getUser();
  }

  openCustomerSupportDialog() {
    const modalRef = this.dialog.open(CustomerSupportModalComponent, {
      width: '600px'
    });
    modalRef.componentInstance.userId = this.user?.id;
  }

  openAddProductDialog() {
    const modalRef = this.dialog.open(AddProductComponent, {
      width: '800px',
      height: '600px'
    })
  }

  logout() {
    this.tokenService.logout();
    this.router.navigate(['/']);
  }
}
