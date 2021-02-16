import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PropertiesService } from 'src/app/services/properties.service';

import * as $ from 'jquery';
import { Property } from 'src/app/interfaces/property';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css'],
})
export class AdminPropertiesComponent implements OnInit {
  propertiesForm: FormGroup; //METHODE REACTIVE il est de type formgroup il faut l'initialiser plus bas

  //on va recuperer mos propriete a ajouter
  propertiesSubscription: Subscription;
  properties: Property[] = []; //type propertyINTERFACE

  //passer ma variable dune fonction a une autre
  indexToRemove;

  //EDIT pour verifier si in est en mode edit ou creation
  indexToUpdate;
  editMode = false;

  //UPLOAD ETAS
  photoUploading = false;
  photoUploaded = false;
  photosAdded: any[] = []; //va contenir le lien de telechargement de la photo a enregistrer

  constructor(
    //On construit notre formulaire
    private formBuilder: FormBuilder, //METHODE REACTIVE
    private propertiesService: PropertiesService
  ) {}

  ngOnInit() {
    //METHODE REACTIVE
    this.initPropertiesForm();
    this.propertiesService.propertiesSubject.subscribe(
      //on initialise l'abonnement au donnes properties
      //type property INTERFACE array
      (data: Property[]) => {
        this.properties = data; //on recupere nos bien est on les mets dans le tableau propertie cree rplus haut
      }
    );
    this.propertiesService.getProperties(); // Pour recuperer LES DONNESS en temps reel
    this.propertiesService.emitProperties(); //on emet les données
  }

  initPropertiesForm() {
    //METHODE REACTIVE
    //formulaire
    this.propertiesForm = this.formBuilder.group({
      //la methode group prends en parametre un objet json//
      //On recupere  tous les champs
      //on controle nos champ avec validator qu'on importe/tous mes champs sont obligatoires
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      rooms: ['', Validators.required],
      description: '',
      price: ['', Validators.required],
      sold: '',
    });
  } //INTERFACE
  /*
  onSubmitPropertiesForm(form: NgForm) {//methode template
    //un formulaire de type ngForm
    console.log(form.value);
  }
  */ onSubmitPropertiesForm() {
    //methode template
    //console.log(this.propertiesForm.value);
    const newProperty: Property = this.propertiesForm.value; //on recupere la valeur du champ//est de type(interface Property)
    newProperty.sold = this.propertiesForm.get('sold').value
      ? this.propertiesForm.get('sold').value
      : false;
    newProperty.photos = this.photosAdded ? this.photosAdded : []; //SI PHOTOSADDED EXISTE

    if (this.editMode) {
      //on fait un update
      this.propertiesService.updateProperty(newProperty, this.indexToUpdate);
    } else {
      this.propertiesService.createProperty(newProperty); //on ajoute la propriete dans propertiesService
    }
    // console.log(this.propertiesService.properties);
    $('#propertiesFormModal').modal('hide'); //ferme le modal
  }

  //resetFormulaire
  resetForm() {
    this.propertiesForm.reset();
    this.editMode = false;
    this.photosAdded = [];
  }
  //supprime le bien
  onDeleteProperty(index) {
    //MODAL
    //boite de dialogue
    /*
    if(confirm('Etes vous sur de vouloir supprimer ce bien ?')){
      this.propertiesService.deleteProperty(index);
    }
*/
    $('#deletePropertyModal').modal('show');
    this.indexToRemove = index;
  }

  onConfirmDeleteProperty() {
    //MODAL
    /*
    if(this.properties[this.indexToRemove].photos && this.properties[this.indexToRemove].photos !==''){
    this.propertiesService.removeFile(this.properties[this.indexToRemove].photos);
    }
    */
    this.properties[this.indexToRemove].photos.forEach(
      //oN boucle sur nos photos pôur les supprimer une par une
      (photo) => {
        this.propertiesService.removeFile(photo); //la fonction removeFile quoi se trouve dans le fichier properties.service
      }
    );

    this.propertiesService.deleteProperty(this.indexToRemove); //index en parametre
    $('#deletePropertyModal').modal('hide'); //ferme le modal
  }

  //FONCTION EDIT
  onEditProperty(property: Property) {
    //type propertyINTERFACE
    this.editMode = true;
    $('#propertiesFormModal').modal('show'); //ferme le modal
    this.propertiesForm.get('title').setValue(property.title); //On recupere le champ et on lui ajoute sa proiprité
    this.propertiesForm.get('category').setValue(property.category); //On recupere le champ et on lui ajoute sa proiprité
    this.propertiesForm.get('surface').setValue(property.surface); //On recupere le champ et on lui ajoute sa proiprité
    this.propertiesForm.get('description').setValue(property.description ? property.description : ''); //On recupere le champ et on lui ajoute sa proiprité
    this.propertiesForm.get('sold').setValue(property.sold);
    this.propertiesForm.get('price').setValue(property.price); //On recupere le champ et on lui ajoute sa proiprité
    this.photosAdded = property.photos ? property.photos : [];
    const index = this.properties.findIndex(
      //oin cherche dans le tableau property l'index
      (propertyEl) => {
        //on compare les elemnts
        if (propertyEl === property) {
          return true;
        }
      }
    );
    // console.log(index);
    this.indexToUpdate = index;
  }

  onUploadFile(event) {
    //QUAND UNE PHOTO EST ENTRAIN D'ETRE UPLOADE/ON RECUPERE EN EVENT
    this.photoUploading = true;
    //je veux le 1 er fichier envoyé

    this.propertiesService
      .uploadFile(event.target.files[0])
      .then((url: string) => {
        //JE RECUPERE GRACE AU CALLBACK  L'URL
        /*
        if (this.photoUrl && this.photoUrl !== '') {
          this.propertiesService.removeFile(this.photoUrl); //SUPPRIME LIMAGE PRECEDENTE//(PROPERTIES.SERVICES)
        }
*/
        this.photosAdded.push(url);
        this.photoUploading = false;
        this.photoUploaded = true; //LE FICHIER A ETE CHARGE

        setTimeout(() => {
          this.photoUploaded = false;
        }, 5000);
      });
  }
onRemoveAddedPhoto(index){
  this.propertiesService.removeFile(this.photosAdded[index]);//On supprime le lien dans firebase
  this.photosAdded.splice(index, 1);//On supprime le lien dans la liste


}



}
