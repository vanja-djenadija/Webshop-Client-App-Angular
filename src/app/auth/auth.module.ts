import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { ActivateComponent } from './activate/activate.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    ActivateComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class AuthModule { }
