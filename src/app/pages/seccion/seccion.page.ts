import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface seccion {
  icon: string;
  name: string;
  redirectTo: string;
}


@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.page.html',
  styleUrls: ['./seccion.page.scss'],
})
export class SeccionPage implements OnInit {
  
  componentes: seccion[] = [
    {
    icon: 'assets/icon/cursos/oja.svg',
    name: 'DBJ-D1',
    redirectTo: '/generar-qr'
    },
    {
    icon: 'assets/icon/cursos/oja.svg',
    name: 'DBJ-D2',
    redirectTo: '/generar-qr'
    },
    {
    icon: 'assets/icon/cursos/oja.svg',
    name: 'DBJ-D3',
    redirectTo: '/generar-qr'
    },
    {
    icon: 'assets/icon/cursos/oja.svg',
    name: 'DBJ-D4',
    redirectTo: '/generar-qr'
    },

  ]

  constructor(private storage:Storage) { }

  ngOnInit() {
  }
  async sendSeccion(seccion){
    await this.storage.set('seccion', seccion+'')
  }
  

}
