import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Storage } from '@ionic/storage-angular';
import { Router, NavigationExtras } from '@angular/router';

interface dataScan {
  CurrentClass: string;
  CurrentDate: string;
};


@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnDestroy {
  code: String;
  nombre: string;
  clases: string[] = [
    "Aplicaciones moviles",
    "Estadistica descriptiva",
    "Ingles", "Portafolio",
    "Arquitectura",
    "Calidad de software",
    "Etica"
  ];
  scannedResult: any;
  content_visibility = '';


  listaActual: dataScan[] = [];


  curso: string;
  //variables para enviar
  data: string;

  constructor(private sg: Storage, private router: Router) { this.get() }

  async get() {
    this.nombre = await this.sg.get("usuario")
  }

  ngOnDestroy(): void {
    this.stopScan();
  }

  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      if (result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult);
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }
  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
  }

  // async ngOnInit() {
  //   this.nombre = await this.sg.get("usuario")
  // }
  numeroAleatorioDecimales() {
    var num = Math.random() * (0 - 6);
    return Math.round((num + 0) * -1)
  }
  async cathData() {
    let aletorio = this.numeroAleatorioDecimales()
    let currentDat = new Date()
    let CurrentClas = this.clases[aletorio]
    this.listaActual['CurrentClass'] = CurrentClas + ""
    this.listaActual['CurrentDate'] = currentDat.toLocaleString()
    // let CurrentClas = this.code
    // this.listaActual['CurrentClass'] = CurrentClas.split(',')[1]
    // this.listaActual['CurrentDate'] = CurrentClas.split(',')[0]
    console.log(this.listaActual);
    if (await this.getStorage('asistencia') != null) {
      let dataSG = await this.getStorage('asistencia')
      let data = []
      data = dataSG
      data.push(this.listaActual)
      console.log(data);
      await this.setStorage('asistencia', data)
    } else {
      await this.setStorage('asistencia', this.listaActual)
      console.log("se creo el storage");
    }
  }

  async cathQR() {

    // this.scan()
    // let claseActualData = await this.getStorage("claseActual")

    let claseActualData = this.code
    this.data = claseActualData + ""
    let fecha = (claseActualData + '').split(',')[0]
    console.log(this.data);
    // let navigate:NavigationExtras = {
    //   state:{
    //     data: this.data
    //   }
    // }
    // // await this.removeKeyStorage();
    // this.router.navigate(['/listas'], navigate)
  }

  async getStorage(key: string) {
    return await this.sg.get(key)
  }

  async setStorage(key: string, valor) {
    return await this.sg.set(key, valor)
  }

  async removeKeyStorage() {
    await this.sg.remove("claseActual")
  }

}
