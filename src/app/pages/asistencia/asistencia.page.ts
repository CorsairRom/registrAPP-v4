import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  constructor(private storage:Storage) { }

  ngOnInit() {
  }

  async getAsistencia(){
    if (this.storage.get('asistencia')!= null) {
      return this.storage.get('asistencia')
    }
  }

}
