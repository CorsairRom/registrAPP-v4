import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Users, Usuario } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage:Storage) { }
  
  async set(key:string, value:Usuario){
    await this.storage.set(key, value)
  }
  get(key:string): Promise<Usuario>{
    return  new Promise((resolve, reject)=>{
      this.storage.get('us').then((res)=>{
        resolve(res);
      })
    })
  }
  remove(key:string){
    this.storage.remove(key)
  }
  

  
}
