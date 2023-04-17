import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeContainerComponent} from './home-container/home-container.component';
import {ProductDetailsComponent} from './products/product-details/product-details.component';
import {ProductsComponent} from './products/products.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AddProductComponent} from "./add-product/add-product.component";

const routes: Routes = [
  {
    path: '',
    component: HomeContainerComponent,
    children: [
      {
        path: '',
        component: ProductsComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent
      },
      {
        path: 'profile',
        component: UserProfileComponent
      },
      {
        path: 'add-product',
        component: AddProductComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}
