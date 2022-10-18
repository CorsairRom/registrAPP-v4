import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { DataService } from './services/data.service';
import { Storage } from '@ionic/storage-angular';
import { Users, Usuario } from '../app/interfaces/users';
import { StorageService } from './services/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers:[DataService]
})
export class AppComponent implements OnInit{
  username:string='';
  opc:boolean=false;
  tipo:Usuario;
  
  constructor(
    private menu:MenuController,
    public datasv:DataService,
    private sg:StorageService,
    public navCtrl: NavController,
    private storage: Storage
    ) {
    
    }
   
  cerrarMenu()
  {
    this.menu.close('first');
  }

  async ngOnInit(){
    await this.storage.create();
    // this.tipo = await this.storage.get("usr");
    
    // await this.getData()
    // this.tipo = await this.getAsync()
    await this.getAsync()
    console.log("este es el tipo ----> " + this.tipo);
    // console.log((await this.getAsync()).nombre);
    
  }

  // async getData(){
  //   return await this.storage.get('usr').then((res: Usuario) => {this.tipo = res})
  // }

  // async getAsync():Promise<Usuario>{
  //   return new Promise((resolve, reject)=>{
  //     this.storage.get('us').then((res)=>{
  //       resolve(res);
  //     })
  //   })
  // }

  async getAsync(){
    await this.sg.get('usr').then(usr=> this.tipo = usr)
    
  }


}
