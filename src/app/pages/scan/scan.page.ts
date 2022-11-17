import { Component, OnInit, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Storage } from '@ionic/storage-angular';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';


interface dataScan {
  CurrentClass: string;
  CurrentDate: string;
};
interface clasesUsuario{
  usuario: string
  clases:{
    currentClass: string;
    currentDate:string;
  }
}

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
  DataShow:dataScan[] = [];


  listaActual: dataScan[] = [];


  curso: string;
  //variables para enviar
  data: string;
  comprobar: string;
  asistenciasUsuario:clasesUsuario;
  dataSG;

  constructor(private sg: Storage, private router: Router, 
              private alertController: AlertController, 
              private loadingCtrl: LoadingController,
              private toastController: ToastController) { this.get() }

  async get() {
    this.nombre = await this.sg.get("usuario")
  }

  ngOnDestroy(): void {
    this.stopScan();
  }
  //------------------SCANER------------------------//
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
        this.code = this.scannedResult+""
        await this.cargarDatos();
        if (this.code.split(',').length > 2) { 
          await this.showLoading();
          
        } else {
          this.stopScan();
          this.presentToast();
        }
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
    //------------------FIN SCANER------------------------//


  async cargarDatos (){
      this.listaActual['CurrentClass'] = this.code.split(',')[1]
      this.listaActual['CurrentDate'] = this.code.split(',')[0]
      if (await this.getStorage('asistencia') != null) {
        this.dataSG = await this.getStorage('asistencia')
        let data = []
        data = this.dataSG
        data.push(this.listaActual)
        console.log(data);
        await this.setStorage('asistencia', data)
        
      } else {
        await this.setStorage('asistencia', this.listaActual)
        console.log("se creo el storage");
      }
      
  }


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
    if (await this.getStorage('asistencia') != null) {
      let dataSG = await this.getStorage('asistencia')
      let data = []
      data = dataSG
      data.push(this.listaActual)
      await this.setStorage('asistencia', data)

    } else {
      await this.setStorage('asistencia', this.listaActual)
    }
  }

  async cathQR() {
    let claseActualData = this.code
    this.data = claseActualData + ""
    let fecha = (claseActualData + '').split(',')[0]
    // let navigate:NavigationExtras = {
    //   state:{
    //     data: this.data
    //   }
    // }
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

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'cargando...',
      duration: 1000,
      spinner: 'circles',
    });
    await loading.present().then(res => setTimeout(() => {
      this.presentAlert()
    }, 1000));
    // await this.cargarDatos();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Registro',
      message: 'Exitoso!',
    });
    
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'QR inválido',
      duration: 1500,
      position: 'middle'
    });

    await toast.present();
  }

  async showData(){
    this.DataShow = await this.sg.get('asistencia')
  }

}
