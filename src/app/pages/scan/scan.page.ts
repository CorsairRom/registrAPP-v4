import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Storage } from '@ionic/storage-angular';

interface dataScan{
  CurrentClass:string;
  CurrentDate:string;
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
    "Aplicaciones moviles", "Estadistica descriptiva", "Ingles", "Portafolio", "Arquitectura", "Calidad de software", "Etica"
  ];

  listaActual: dataScan[] = [
    {
      CurrentClass : '',
      CurrentDate : ''
    }
  ];
  curso:string;
  constructor(private barcodeScanner: BarcodeScanner, private sg:Storage) { }


  
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

  cathDate(){
    let aletorio = this.numeroAleatorioDecimales()
    let currentDat = new Date()
    let CurrentClas = this.clases[aletorio]
    console.log(CurrentClas);
    this.listaActual["CurrentClass"] = CurrentClas
    this.listaActual["CurrentDate"] = currentDat.toISOString()
    this.SetData()
    console.log(this.listaActual);
    // this.sg.set("asd", asdas)

    
    
  }
  async SetData ():Promise<void> {
    await this.sg.set("scanData", this.listaActual);
  }
}
