import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

interface asignatura{
  icon: string;
  name: string;
  redirectTo: string;
}

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage implements OnInit {

  componentes: asignatura[] = [
    {
    icon: 'assets/icon/cursos/portafolio.png',
    name: 'Portafolio',
    redirectTo: '/seccion'
    },
    {
    icon: 'assets/icon/cursos/computadora.png',
    name: 'Aplicaciones moviles',
    redirectTo: '/seccion'
    },
    {
    icon: 'assets/icon/cursos/arquitectura.png',
    name: 'Arquitectura',
    redirectTo: '/seccion'
    },
    {
    icon: 'assets/icon/cursos/etica.png',
    name: 'Etica',
    redirectTo: '/seccion'
    },
    {
    icon: 'assets/icon/cursos/eng.png',
    name: 'Ingles',
    redirectTo: '/seccion'
    },
    {
    icon: 'assets/icon/cursos/calidad.png',
    name: 'Calidad de software',
    redirectTo: '/seccion'
    },
    {
    icon: 'assets/icon/cursos/analitica.png',
    name: 'Estadistica descriptiva',
    redirectTo: '/seccion'
    },
  

  ]


  constructor(private storage:Storage) { }

  ngOnInit() {
  }
  async sendData(name){
    await this.storage.set('asignatura', name+"")
  }

}
