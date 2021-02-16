import { Injectable } from '@angular/core';
import firebase from 'firebase';
import 'firebase/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}
/*
  signUpUser(email: string, password: string) {
    //On recupere les données
    return new Promise((resolve, reject) => {//Promise
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          //then tous c'est bien passé
          (data) => {
            console.log('Connecté');
         resolve(data);
          }
        )
        .catch((error) => {
          reject(error);
        });
    });
  }
*/
//FIREBASE
signInUser(email: string, password: string) {
  //On recupere les données
  return new Promise((resolve, reject) => {//Promise
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        //then tous c'est bien passé
        (data) => {
          console.log('CONNECTE');
       resolve(data);
        }
      )
      .catch((error) => {
        reject(error);
      }
      );
  }
  );

}
signOutUser(){
 firebase.auth().signOut();//DECONECTION SUPPRIME LE COOKIES //DANS LE HEADER BUTTON DECONNEXION

}

}

