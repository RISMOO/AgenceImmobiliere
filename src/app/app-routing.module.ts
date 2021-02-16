import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SinglePropertyComponent } from './single-property/single-property.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},//homecomponent
  //onsecurise notre route dashboard
  {path:'admin/dashboard',canActivate:[AuthGuardService],component:AdminDashboardComponent},//localhost:4200/admin/dashboard
  {path:'property/:id',component:SinglePropertyComponent},//paremetre variable
//dans notre app-component on rajoute la balise <router-outlet></router-outlet>
  {path:'login',component:SigninComponent},//renvoi le composant signincomponent
  {path:'',redirectTo:'home',pathMatch:'full'},//pathmatch recupere lensemble du chemin
  {path:'**',redirectTo:'home'}//si lutilisateur tape une route qui nexiste pas

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
