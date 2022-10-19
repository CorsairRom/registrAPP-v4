import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../interfaces/users';


interface seccion {
  name: string;
  secci: string;
  redirectTo: string;
}


@Component({
  selector: 'app-listas',
  templateUrl: './listas.page.html',
  styleUrls: ['./listas.page.scss'],
})
export class ListasPage implements OnInit {
  horac: string = '';
  fecha: string = '';
  RegHora:string;
  RegFecha:string;
  item = [];
  listaActual={
    "CurrentClass": "",
    "CurrenteDate": ""
  }
  drop:any;
  data:string;
  usr:Usuario;
  nombre:string;
  favorito: boolean = false;
  constructor(private sg:Storage, private router:Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(params =>{
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.data
        console.log(this.data);
      }
    })
   }

  componentes: seccion[] = [
    {
      name: 'juan',
      secci: 'AW-D1',
      redirectTo: 'precente'
    },
    {
      name: 'rover',
      secci: 'AW-D1',
      redirectTo: 'precente'
    },
    {
      name: 'isaac',
      secci: 'AW-D1',
      redirectTo: 'precente'
    },
    {
      name: 'waco',
      secci: 'AW-D1',
      redirectTo: 'precente'
    },
    {
      name: 'waco',
      secci: 'AW-D1',
      redirectTo: 'precente'
    }, {
      name: 'waco',
      secci: 'AW-D1',
      redirectTo: 'precente'
    }, {
      name: 'waco',
      secci: 'AW-D1',
      redirectTo: 'precente'
    }, {
      name: 'waco',
      secci: 'AW-D1',
      redirectTo: 'precente'
    }, {
      name: 'waco',
      secci: 'AW-D1',
      redirectTo: 'precente'
    }, {
      name: 'waco',
      secci: 'AW-D1',
      redirectTo: 'precente'
    }, {
      name: 'waco',
      secci: 'AW-D1',
      redirectTo: 'precente'
    }, {
      name: 'waco',
      secci: 'AW-D1',
      redirectTo: 'precente'
    }, {
      name: 'waco',
      secci: 'AW-D1',
      redirectTo: 'precente'
    }, {
      name: 'waco',
      secci: 'AW-D1',
      redirectTo: 'precente'
    }, {
      name: 'waco',
      secci: 'AW-D1',
      redirectTo: 'precente'
    },
  ]

  async ngOnInit() {
    let hora = new Date();
    this.horac = hora.toLocaleTimeString()
    this.fecha = hora.toLocaleDateString()
    await this.getDato()
    let dropdate = (this.drop["CurrentDate"]+"").split("T")
    this.RegFecha = dropdate[0]
    this.RegHora = (dropdate[1]+"").split(".")[0]
    this.usr = await this.getDataStorage()
    this.nombre = this.usr.nombre
    console.log(this.usr.nombre);
    
  }

  async getDato(){
    this.drop = await this.sg.get("scanData")
  }

  onClick() {
    this.favorito = !this.favorito;
  }
 
  doRefresh(event) {
    setTimeout(() => {
      this.item = this.componentes
      event.target.complete();
    }, 1500)
  }

  loadData(event) {
    setTimeout(() => {
      const alupm = this.componentes
      this.item.push(...alupm)
      event.target.complete();
    }, 1500)
  }

  async getDataStorage(){
      return this.sg.get('usr')
  }


}
