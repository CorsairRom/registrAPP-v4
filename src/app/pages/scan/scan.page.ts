import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Router, NavigationExtras } from '@angular/router';

interface dataScan{
  CurrentClass: string;
  CurrentDate: string;
};


@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  code: String;
  nombre: string;
  clases:string[]=[
    "Aplicaciones moviles", 
    "Estadistica descriptiva", 
    "Ingles", "Portafolio", 
    "Arquitectura", 
    "Calidad de software", 
    "Etica"
  ];


  listaActual:dataScan[] = []; 
 

  curso:string;
  //variables para enviar
  data:string;
  
  constructor(private sg:Storage, private router:Router) { }

  async ngOnInit() {
    this.nombre = await this.sg.get("usuario")
  }
  numeroAleatorioDecimales() {
    var num = Math.random() * (0 - 6);
    return Math.round((num + 0)*-1)
  }
  async cathData(){
    let aletorio = this.numeroAleatorioDecimales()
    let currentDat = new Date()
    let CurrentClas = this.clases[aletorio]
    this.listaActual['CurrentClass'] = CurrentClas+""
    this.listaActual['CurrentDate'] = currentDat.toLocaleString()
    // let CurrentClas = this.code
    // this.listaActual['CurrentClass'] = CurrentClas.split(',')[1]
    // this.listaActual['CurrentDate'] = CurrentClas.split(',')[0]
    console.log(this.listaActual);
    if (await this.getStorage('asistencia')!=null) {
      let dataSG = await this.getStorage('asistencia')
      let data= []
      data = dataSG
      data.push(this.listaActual)
      console.log(data);
      await this.setStorage('asistencia', data)
    } else {
      await this.setStorage('asistencia', this.listaActual)
      console.log("se creo el storage");
    }
  }
 
  async cathQR(){
    
    // this.scan()
    // let claseActualData = await this.getStorage("claseActual")
   
    let claseActualData = this.code
    this.data = claseActualData+""
    let fecha = (claseActualData+'').split(',')[0]
    console.log(this.data);
    // let navigate:NavigationExtras = {
    //   state:{
    //     data: this.data
    //   }
    // }
    // // await this.removeKeyStorage();
    // this.router.navigate(['/listas'], navigate)
  }

  async getStorage(key:string){
    return await this.sg.get(key)
  }

  async setStorage(key:string,valor){
    return await this.sg.set(key, valor)
  }

  async removeKeyStorage(){
    await this.sg.remove("claseActual")
  }
  
}
