import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Users, Usuario } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})



export class AutorizarGuard implements CanActivate {
  dataGet:Usuario;
  constructor(private storage:Storage, private router:Router){ 
  }

  async autorizar(){
    let auths = await this.storage.get('usr')
    if (auths)
    {
      return true
    }
    return this.router.navigate(['/login']);
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.autorizar();
  }
  
}
