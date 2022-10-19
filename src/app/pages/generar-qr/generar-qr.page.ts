import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage implements OnInit {

  nam = 'hola mundo'
  name = 'Angular ';
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = this.nam //aqui colocar una variable
  backgroundColor = '#ffb60f'
  duocColorB = '#00263e'
  scale = 8

  display:boolean = false;
  constructor(private storage:Storage) { }

  ngOnInit() {
  }

  genQR(){
    this.display = !this.display
  }

}
