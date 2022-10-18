import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Users, Usuario } from '../interfaces/users'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  users: Usuario;
  username: string = '';
  opc: boolean = false;
  constructor(private storage: Storage, private http: HttpClient) { }

  async setUser() {
    await fetch('../assets/users.json').then(response => {
      return response.json();
    }).then(data => {
      this.users = data;
    })
  }

  async getUser(){
    return this.http.get('../assets/users.json')
                        .toPromise()
                        .then(resp => {
                          const usr = resp as Usuario;
                          return Promise.resolve(usr)
                        })
  }
  
}
