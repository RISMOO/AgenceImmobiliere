import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';





//import {formsmodule/methodetempalte}
//import {reactiveFormsModule/methodeReactive}
import { FormsModule, ReactiveFormsModule} from '@angular/forms';//FORMULAIREet on lajoute au tableau des imports[]
//methode TEMPLATE ET REACTIVE

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminPropertiesComponent } from './admin/admin-properties/admin-properties.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SinglePropertyComponent } from './single-property/single-property.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AdminDashboardComponent,
    AdminPropertiesComponent,
    SigninComponent,
    SinglePropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
