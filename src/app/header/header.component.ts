import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Observable, interval, Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

import firebase from 'firebase';/*ON IMPORTE FIREBSES POUR  LA CONNECTION */
@Component({
  selector: 'app-header', //permet de creer une balise app-header et de l'importer dans app.compoent
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  //onDestroy sera declenché au moment de la desctruction du componnent
  title = 'Mon Agence Immo';

  isLoggedIn=false;
 // isDisabled = false;
  //on creer un observeur
  secondes: number; //correpondra au nombre de seconde depuis la connection de l'utilisateur
  counterSubscription: Subscription; //on creer une subscription qui serta de type subscription
  constructor(
    private authenticationService:AuthenticationService//ON IMPORTE AUTHENTICATIONN SERVICE
  ) {}//POUR POUVOIR EXECUTER signOutUser quie se troiuve dans autenticationservice

  ngOnInit() {//au chargement du componsant
  //ON ECOUTE LE STATUE DE LUTILISATEUR CONNECTE OU PAS
  //CETTE FONCTION NOUS RETOURNE LA SESSION(si il y aun usersession il est connecté)
    firebase.auth().onAuthStateChanged(
      (userSession)=>{
        if (userSession){
          console.log('userSession', userSession);
          this.isLoggedIn=true;
          const counter = interval(1000);
          this.counterSubscription = counter.subscribe((value: number) => {
            this.secondes = value;
          })

        }else{

          console.log('Deconnecté');
          this.isLoggedIn=false;
        }


      }

    );
    //On cree une observable qui va emettre un chiffre toute les secondes
   // const counter = interval(1000);
    //subscribe permet dobserver une observable et il peu prendre jusqua 3 arguments et de reagir au changement
    //1er argument on recoi les données
    //cette methode retourne une subscription
  }
  /*
  onClick() {
    //this fait reference a la class headercomponent
    if ((this.isDisabled = false)) {
      alert('activé');
    } else {
      alert('desactivé');
    }
  }
*/

  ngOnDestroy() {
    this.counterSubscription.unsubscribe(); //on se deasbonne en detruisant
  }

  onSignOut(){
  this.authenticationService.signOutUser();//execute la FONCTION SignOutUser creer dans authentication.ts

  }
}
