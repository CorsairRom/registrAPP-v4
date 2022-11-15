import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { IonicNativePlugin } from '@ionic-native/core';

// import {EmailComposer} from "@ionic-native/email-composer/ngx";
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  pass:string = 'admin';
  frmRecuperar: FormGroup;
  hasAccount: false;
  usuario:string = 'admin';
  emailTo:string;
  constructor(public fb: FormBuilder, private emailComposer: EmailComposer) {
    this.emailComposer.isAvailable().then((available: boolean)=>{
      if(available){
        this.openEmail();
      }
    });
    this.frmRecuperar = this.fb.group({
      'usuario': new FormControl("", Validators.required),
    })
   }
   
  ngOnInit() {
    
  }

  async checkAccount(){
    this.hasAccount = await this.emailComposer.hasAccount();
  }

  async openEmail(){
    const email: EmailComposerOptions = {
      to: 'ric.romero',
      attachments: [],
      subject: 'Recuperar Contraseña de '+ this.usuario,
      body: 'la contraseña es: '+ this.pass,
      isHtml: false
    }
    await this.emailComposer.open(email);
  }



  // sendEmail(){
  //   let dataForm = this.frmRecuperar.value
  //   let em = dataForm.email+""
  //   let usuario = dataForm.usuario

  //   this.emailComposer.isAvailable().then((available: boolean) =>{
  //     if(available) {
  //       //Now we know we can send
  //     }
  //    });
     
  //    let email = {
  //      to: em,
  //      attachments: [],
  //      subject: 'Recuperar Contraseña de '+ usuario,
  //      body: 'la contraseña es: '+ this.pass ,
  //      isHtml: true
  //    };
  //    this.emailComposer.open(email);
  
  // }
}
