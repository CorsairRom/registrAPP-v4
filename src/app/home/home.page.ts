import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import {Storage} from '@ionic/storage-angular'
import { Users, Usuario } from '../interfaces/users';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  username:string='';
  usr: string='';
  opc:boolean=false;
  tipo:string;
  dataGet:Usuario;
  constructor(
    private router:Router,
    private activatedRouter:ActivatedRoute,
    private menu:MenuController,
    public datasv:DataService,
    public navCtrl: NavController,
    private storage:Storage
  ) {
    
    // this.activatedRouter.queryParams.subscribe(params=>{
    //   if (this.router.getCurrentNavigation().extras.state) {
    //     let usuario = this.router.getCurrentNavigation().extras.state.requestUser;
    //     this.tipo = this.router.getCurrentNavigation().extras.state.tipo;
    //     this.username = usuario
        
    //   }
      
    // })
  }
  verMenu(){
    this.menu.toggle('first');
  }
  async ngOnInit() {
    await this.getData()
    console.log(this.dataGet);
    this.username = await this.dataGet.nombre
    this.tipo = await this.dataGet.tipo
    
    
    
    
  }
  doRefresh(){
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  async endSession(){
    await this.storage.remove('usr')
    await this.storage.remove('us')
    await window.location.reload();
    this.router.navigate(['/login'])
  }

  async getData(){
    this.dataGet = await this.storage.get("usr")
  }
  
}
