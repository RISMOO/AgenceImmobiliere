import { Component } from '@angular/core';
import { from, Observable, interval } from 'rxjs';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AgenceImmobiliere';
  sold = false;

  //FIREBASE
  //import de notre configuration firebase
  //import * as  firebase from  'firebase';
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyDrjOGUmC7qpVXcZ9S3e04nAGkQalWxkdk",
      authDomain: "agenceimmobilere-508d2.firebaseapp.com",
      projectId: "agenceimmobilere-508d2",
      storageBucket: "agenceimmobilere-508d2.appspot.com",
      messagingSenderId: "507798338058",
      appId: "1:507798338058:web:7c549495189ae86d5c7df3"
    };
    //on initialize

    firebase.initializeApp(firebaseConfig);
  }
}
