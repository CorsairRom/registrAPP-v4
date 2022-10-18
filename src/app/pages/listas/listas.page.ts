import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


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

  favorito: boolean = false;
  constructor(private sg:Storage) { }

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
    
    
    
    console.log(this.drop["CurrentDate"]);
    console.log(typeof this.drop);
    
    

  }

  async getDato(){
    this.drop = await this.sg.get("scanData")
  }

  onClick() {
    this.favorito = !this.favorito;
  }
  verhora() {
    let hora = new Date();
    this.horac = hora.toLocaleTimeString()
    this.fecha = hora.toLocaleDateString()
    console.log(hora.toLocaleTimeString());
    console.log(hora.toLocaleDateString());

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

}
