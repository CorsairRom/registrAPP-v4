import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { LoginPage } from './login.page';
import { Usuario } from '../../../interfaces/users';
import { HttpClient, HttpClientModule } from '@angular/common/http';

xdescribe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



describe('mi Storagea', () => {

  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,HttpClientModule],
      declarations:[LoginPage],
      providers: [Storage,StorageService]
    });

    fixture = TestBed.createComponent(LoginPage);

    component = fixture.componentInstance;
    component.ngOnInit();    

  });
  
  it('form inválida cuando está vacía', () => {
    expect(component.frmlogin.valid).toBeFalsy();
  });
  



});
//describe('AppComponent', () => {

  //beforeEach(waitForAsync(() => {

//    TestBed.configureTestingModule({
////     declarations: [LoginPage],
//      imports:[FormBuilder,FormGroup,FormControl,Validators],
//      schemas: [CUSTOM_ELEMENTS_SCHEMA],
//    }).compileComponents();
//  }));

//  it('should create the app', () => {
//    const fixture = TestBed.createComponent(LoginPage);
//    const app = fixture.debugElement.componentInstance;
//    expect(app).toBeTruthy();
//  });
  // TODO: add more tests!

//});
