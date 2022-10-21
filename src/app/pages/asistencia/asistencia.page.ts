import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';



interface dataScan{
  CurrentClass: string;
  CurrentDate: string;
};

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  
  dataStorage:dataScan[]=[]
  current:any;
  curso:string;
  cursoData:dataScan[]=[]
  // cursoData=[]
  

  constructor(private storage:Storage, private router:Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(params =>{
      if (this.router.getCurrentNavigation().extras.state) {
        this.curso = this.router.getCurrentNavigation().extras.state.curso
        console.log(this.curso);
      }
    })
   }

  async ngOnInit() {
    
    this.dataStorage = await this.getStorage('asistencia')
    console.log(this.dataStorage);
    // let dataST = this.dataStorage.forEach(res => res.CurrentClass == this.curso)
    console.log('datos del for each');
    // console.log(this.dataStorage.forEach(res => res.CurrentClass == this.curso));
    if (this.dataStorage !=null) {
      let opcion = this.dataStorage.some(res => res.CurrentClass == this.curso);
      if (opcion) {
        this.cursoData  = this.dataStorage.filter(res => res.CurrentClass == this.curso);
        console.log(this.cursoData);
      }
    }
    
  }

  async getStorage(key:string){
    if (this.storage.get(key)!= null) {
      return await this.storage.get(key)
    }
  }
  async setStorage(key:string, value){
    await this.storage.set(key, value);
  }

}
