import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup; //FORMGROUP modele de donnes qui nous permet d'utiliser la methode reactive
  constructor(
    private formBuilder: FormBuilder, //import de formbuilder
    private authenticationService: AuthenticationService, //import authentcation
    //POUR LA REDIRECTION DE NOTRE UTILISATEUR VERS SON DASHBOARD ON IMPORTE NOTRE ROUTER
    private router: Router
  ) {}

  ngOnInit() {
    this.initSigninForm();
  }

  initSigninForm() {
    //initilaisation de notre formulaire

    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  //INSCRIPTION
  //on recuoere les informations du formulaire
  onSubmitSigninForm() {
    // console.log(this.signinForm.value)
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    //on verfie l'autehtification
    //comme on retourne une promise on peut faire un .then pour recupere les informations des reponses du serveur
    this.authenticationService.signInUser(email, password).then(
  (data)=>{
  this.router.navigate(['/admin','dashboard']);
    //console.log(data);

  }

    ).catch(
      (error)=>{

        console.log(error);
      }
    );
  }
}
