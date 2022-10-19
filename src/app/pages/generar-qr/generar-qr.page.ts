import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage implements OnInit {
  
  //variables NgxQR ⬇
  name = 'Angular ';
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value:string; //aqui colocar una variable
  backgroundColor = '#ffb60f'
  duocColorB = '#00263e'
  scale = 8
  //variables pagina ⬇
  display:boolean = false;
  asignatura:string = '';
  seccion:string = '';
  fecha:string = '';
  hora:string = '';
  

  constructor(private storage:Storage) { }

  async ngOnInit() {
    let h = await this.getFecha()
    this.fecha = h.toLocaleString().split(',')[0]
    this.hora = h.toLocaleString().split(',')[1]
    this.asignatura = await this.getDataAsignatura()
    this.seccion = await this.getDataSeccion()
    this.value = this.fecha+','+this.hora+','+this.asignatura+','+this.seccion
    console.log(this.value);
    
  }

  async genQR(){
    this.display = !this.display
    await this.setStorageData()
  }
  async getDataAsignatura(){
    return await this.storage.get('asignatura')
  }
  async getDataSeccion(){
    return await this.storage.get('seccion')
  }
  async getFecha(){
    let hr = new Date
    return hr
  }
  async setStorageData(){
    await this.storage.set("claseActual", this.value)
    console.log("HolaMundo");
  }

}
