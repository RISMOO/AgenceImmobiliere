import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  //on implements avec canActivate

  constructor(
    private router: Router //import router
  ) {}

  canActivate() : Observable<boolean> | Promise<boolean> | boolean{//il peux etre de type observable ,promise ou booleen
return new Promise(
(resolve, reject)=>{
 firebase.auth().onAuthStateChanged(//on verfifie letat de conbnexction de l'utilisateur
(userSession)=>{

  if(userSession){
    resolve(true);//si connecté on acces aux routes
  }else{//sinon on le redirige vers la page home
 this.router.navigate(['/home']);
 resolve(false);

  }
}
 )
}
);

  }
}
