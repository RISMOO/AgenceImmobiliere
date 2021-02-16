import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertiesService } from '../services/properties.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  dateNow = new Date();

  properties = [];
  //subscription variable
  propertiesSubscription: Subscription;

  //on import notre properties.service
  //Quans le composant est appelé, le constructor est executé
  constructor(
    private propertiesServices: PropertiesService //Chemin /la class PropertieService qui se trouve danbs le dossier properties.services
  ) {}
  //s'execute au chargement de notre component
  ngOnInit() {
    //PROMISE
    /*
    //notre promise then(prend une fonction anonyme) (qu'est ce que je fais quand jai eu une réponse)et catch(qu'est ce que je fais quand jai eu une erreur)
this.propertiesServices.getProperties().then(
 // data=properties recuperé avec un type =any(n'importe quoi)

  (data:any)=>{
   console.log(data);
   this.properties=data;

  }
)
 .catch(
  (error) => {
    console.error(error);
  }

);
*/
    //OBSERVABLE
    //notre observable (prend une fonction anonyme en parametre subscribe(on s'abonne))
    this.propertiesSubscription = this.propertiesServices.propertiesSubject.subscribe(
      // data=properties recuperé avec un type =any(n'importe quoi)

      (data: any) => {
        //1er cas
        this.properties = data;
      }
      /*
      //2eme cas
      (error) => {},
      //3eme cas
      () => {
        console.log('Observable complete !');
      }
      */
    );
    this.propertiesServices.getProperties();
    this.propertiesServices.emitProperties();
  }
  getSoldValue(index) {
    //inderx de notre tableau sur lequel on va boucler
    if (this.properties[index].sold) {
      return 'green';
    } else {
      return 'red';
    }
  }


  ngOnDestroy() {
    //on se desabonne
    this.propertiesSubscription.unsubscribe();
  }
}
