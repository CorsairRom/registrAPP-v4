import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { ComponentsModule } from '../../../components/components.module';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ComponentsModule,
    NgxQRCodeModule
    
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
