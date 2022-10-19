
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage-angular'

import { Users, Usuario } from '../../../interfaces/users';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  sendData: Usuario;
  users: Users;
  frmlogin: FormGroup;
  loading: HTMLIonLoadingElement;
  userData: Usuario;

  dato = [{
    horac: "",
    fecha: ""
  }]

  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';

  constructor(public fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    public datasv: DataService,
    public sg: StorageService,
    public navCtrl: NavController,
    private storage: Storage,
    public loadingController: LoadingController
  ) {

    this.frmlogin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })
  }

  async ngOnInit() {
    await fetch('../assets/users.json').then(response => {
      return response.json();
    }).then(data => {
      return this.users = data
    })
    // pruebas service
    this.userData = await this.datasv.getUser();
    console.log(this.userData);

    // this.codeMonkey()

    let hr = await this.getHora()

    console.log(this.getHora());
    
    this.dato["hora"]=hr.toISOString()
    this.dato["fecha"]=hr.toISOString()
    console.log(this.dato);
    
    

  }
  async getHora(){
    let hr = new Date
    return hr
  }

  async checkUsr(input: string, user) {
    await user.usuarios.some(usr => {
      return usr.usr === input
    })
  }
  // async checkop(input:string){
  //   await this.users.usuarios.find(usr=>{
  //     return usr.usr === input
  //   })
  // }
  onSubmit() {
    var f = this.frmlogin.value
    this.sendData = this.users.usuarios.find(usr => { return usr.usr === f.usuario })
    if ((this.sendData?.usr == f.usuario && this.sendData?.password == f.password)) {
      this.mostrarLoading();

    }
    else {
      this.presentAlert();
    }
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Iniciando Sesion'
    });
    await this.loading.present();
  }
  mostrarLoading() {
    this.presentLoading();
    this.log(this.sendData);
    this.setStorageAsync();

    setTimeout(() => {
      this.loading.dismiss();
      this.router.navigate(['/home'])
    }, 2000);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Acceso Denegado',
      subHeader: '',
      message: ' Usuario O contraseña incorrectos',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // console.log('Alert canceled');
          },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            // console.log('Alert canceled');
          },
        },
      ],
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'miclase',
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log(`Dismissed with role: ${role}`);
  }
  async log(SD) {
    await this.storage.set("usr", SD)
  }

  async setStorageAsync() {
    this.sg.set('us', this.sendData)

  }

  async codeMonkey() {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '12ea2cd02fmsh2881d68851ff8b2p173575jsnc0b7188ffb3c',
        'X-RapidAPI-Host': 'qrcode3.p.rapidapi.com'
      },
      body: '{"data":"asdasd","image":"Clase"}'
    };

    fetch('https://qrcode3.p.rapidapi.com/qrcode/text', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }

}

