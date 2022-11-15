import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { IonicNativePlugin } from '@ionic-native/core';
import { ToastController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

// import {EmailComposer} from "@ionic-native/email-composer/ngx";
// import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';
import { Usuario, Users } from '../../../interfaces/users';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  pass:string;
  frmRecuperar: FormGroup;
  email:string;
  usuario:string;
  userData:Users;
  dataCollected:Usuario;
  
  constructor(public fb: FormBuilder, public datasv: DataService, private toastController: ToastController) {
    this.frmRecuperar = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'email': new FormControl("", Validators.required),
      
    })
   }
   
  async ngOnInit() {
    this.userData = await this.datasv.getUser();

  }

  async recuperarPass(){
    let form = this.frmRecuperar.value
    let queryUsr = this.userData.usuarios.some(usr => {return usr.usr == form.usuario})
    let queryEmail = this.userData.usuarios.some(usr =>{return usr.email == form.email})
    if (queryUsr && queryEmail) {
      this.dataCollected = this.userData.usuarios.find(usr => {return usr.usr == form.usuario})
      
      await this.toastMessage(this.dataCollected.password+"")
    } else {
      
      await this.toastMessage("El usuario no fue encontrado")
    }
  }

  async toastMessage(message:string){
    const toast = await this.toastController.create({
      message: 'Tu Contraseña es: '+message,
      duration: 2000,
      position: 'middle'
    })
  }
}
