import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeContainerComponent } from './home-container/home-container.component';
import { ProductsComponent } from './products/products.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { BoxComponent } from './box/box.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { NgImageSliderModule } from "ng-image-slider";
import { CustomerSupportModalComponent } from './customer-support-modal/customer-support-modal.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UpdateUserModalComponent } from './user-profile/update-user-modal/update-user-modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AddProductComponent } from './add-product/add-product.component';
import {MatStepperModule} from "@angular/material/stepper";
import { PurchaseModalComponent } from './products/product-details/purchase-modal/purchase-modal.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSliderModule} from "@angular/material/slider";

@NgModule({
  declarations: [
    HomeContainerComponent,
    ProductsComponent,
    BoxComponent,
    ProductDetailsComponent,
    CustomerSupportModalComponent,
    UserProfileComponent,
    UpdateUserModalComponent,
    ConfirmationModalComponent,
    AddProductComponent,
    PurchaseModalComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        AppMaterialModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule,
        NgImageSliderModule,
        MatDialogModule,
        MatStepperModule,
        MatTooltipModule,
        MatSliderModule
    ]
})
export class HomeModule { }
