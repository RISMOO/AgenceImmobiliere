import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Subject } from 'rxjs';
import { Property } from '../interfaces/property';

//le but du services et ce fairte la comunication entre nos differents components
//on importera dans home
@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  properties: Property[] = []; //INTERFACE PROPERTY//TOUS LES BIEN IMMOBILIERS
  //propriete de nos maisons
  /*
    {
      title: 'Ma super maison', //index 0
      category: 'Maison',
      sold: true,
      surface:85,
      image: '/assets/img/maison2.jpg',
    },
    {
      title: 'Petit appartement', //index 1
      category: 'Appartement',
      sold: true,
      image: '/assets/img/maison3.jpg',
    },
    {
      title: 'Belle villa',
      category: 'Maison',
      sold: false,
      image: '/assets/img/maison.jpg',
    },
    */

  //variable subject=type observable=emetteur(c'est a lafois un observeur et un observable des qu'il y a une modification il emet)

  //propertiesSubject = new Subject<any[]>();
  propertiesSubject = new Subject<Property[]>(); //on fait appel a l'interface

  constructor() {}
  //misa a jour
  emitProperties() {
    this.propertiesSubject.next(this.properties);
  }

  saveProperties() {
    firebase.database().ref('/properties').set(this.properties); //TOUS LES BIENS IMMOBILIERS SERONT ICI on les ajoutent dans la base de données
  }

  //fonction recuperation de nos proprieté dans la base de données
  getProperties() {
    firebase
      .database()
      .ref('/properties')
      .on('value', (data) => {
        //.on modification dans la base de donnés
        this.properties = data.val() ? data.val() : []; //on recupere nos donnes dans une variables tampons si il y en a sinon un tableau vide
        this.emitProperties();
      });
  }

  //METHODE RECUPERATION D'UN SEUL BIEN(single-property)
  getSingleProperties(id) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('/properties/' + id)
        .once('value')
        .then(
          //on recupere la proprieté dans la base de données
          (data) => {
            resolve(data.val());
          }
        )
        .catch((error) => {
          reject(error);
        });
    });
  }

  //CRUD
  createProperty(property: Property) {
    //type propertyINTERFACE

    this.properties.push(property); //on rajoute une propriete a notre tableau properties
    this.saveProperties(); /*ON SAUVEGARDE */
    this.emitProperties();
  }

  //FONCTION DELETE
  deleteProperty(index) {
    this.properties.splice(index, 1); //on supprime un element a partir de l'index renseigné
    this.saveProperties(), //on sauvegarde les modifications
      this.emitProperties; //on met a jour
  }
  updateProperty(property: Property, index) {
    //le bien qui est a l'index ici va etre egale au nouveau bien//type propertyINTERFACE
    /*
 this.properties[index]=property;
 this.saveProperties(),//on sauvegarde les modifications
 this.emitProperties;
 */
    firebase
      .database()
      .ref('properties/' + index)
      .update(property)
      .catch((error) => {
        console.error(error);
      });
  }
  //FONCTION UPLOAD PROMISE/en parametre un fichier de type fichier (il faut activer le strorage dans firebase)
  uploadFile(file: File) {
    //on va ecouter la base de données a chaque changement d'etat
    return new Promise((resolve, reject) => {
      const uniqueId = Date.now().toString(); //je converti en chaine de caracteres
      const fileName = uniqueId + file.name;
      const upload = firebase
        .storage()
        .ref()
        .child('images/properties/' + fileName)
        .put(file); //l'emplacement de l'image dans le storage
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('Chargemnet......'); //PENDING
        },
        (error) => {
          //ERROR
          console.error(error);
          reject(error);
        },
        () => {
          //ON RECUPERE LE LIEN
          upload.snapshot.ref.getDownloadURL().then((downLoadUrL) => {
            //CALLBACK download
            resolve(downLoadUrL);
          });
        }
      );
    });
  }
  //SUPPRIME LA PHOTO
  removeFile(fileLink: string) {
    //LIEN DE TELECHARGEMENT
    if (fileLink) {
      //ON RECUPERE LE LIEN
      const storageRef = firebase.storage().refFromURL(fileLink); //CA PLACE DANS LA CONSTANTE LA REFERENCE DU FICHIER A PARTIR DE SON LIEN
      storageRef
        .delete()
        .then(
          //SI TOUS CEST BIEN PASSE
          () => {
            console.log('Fichier supprimé');
          }
        )
        .catch((error) => {
          console.error(error);
        });
    }
  }

  /*
  return new Promise(
    //promise  nous peremtra de creer des fonctions asynchrones//une promise lancé est inaretable
  //promise a donc 2 paramettres (resolve, reject) qui sont eux memes des fonctions//Une promise a 3 étapes possibles Pending(en attente,je fais quoi en attendant la reponse)
  //
    (resolve, reject)=>{
  //si properties existe et qui y a quelque chose dedans
      if (this.properties && this.properties.length >0){
        resolve(this.properties);

      }else{
        const error=new Error('Properties does not exist or is empty');
        reject(error);
      }
    }
  );
  */
  /*
    //un observer en parametre
    return new Observable((observer) => {
      if (this.properties && this.properties.length > 0) {
        observer.next(this.properties); //observer.next transmet les données
        observer.complete();
      } else {
        const error = new Error('Properties does not exist or is empty');
        observer.error(error);
      }
    });
  }
  */
}
