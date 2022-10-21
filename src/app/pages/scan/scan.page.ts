import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
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
  code: any;
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
  asistencias = [{}]


  curso:string;
  //variables para enviar
  data:string;
  
  constructor(private barcodeScanner: BarcodeScanner, 
              private sg:Storage,
              private router:Router) { }
  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.code= barcodeData.text;
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }
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
  
    if (await this.getStorage('asistencia')!=null) {
      let dataSG = await this.getStorage('asistencia')
      let data= []
      data = dataSG
      data.push(this.listaActual)
      await this.setStorage('asistencia', data)
    } else {
      await this.setStorage('asistencia', this.listaActual)
      console.log("se creo el storage");
    }
  }
 
  async cathQR(){
    let claseActualData = await this.getStorage("claseActual")
    this.data = claseActualData+""
    let fecha = (claseActualData+'').split(',')[0]
    console.log(this.data);
    let navigate:NavigationExtras = {
      state:{
        data: this.data
      }
    }
    // await this.removeKeyStorage();
    this.router.navigate(['/listas'], navigate)
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
