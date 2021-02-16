import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../interfaces/property';
import { PropertiesService } from '../services/properties.service';

@Component({
  selector: 'app-single-property',
  templateUrl: './single-property.component.html',
  styleUrls: ['./single-property.component.css']
})
export class SinglePropertyComponent implements OnInit {
  property:Property;
  constructor(
    private route:ActivatedRoute,//on importe activate route
    private propertiesServices:PropertiesService//On importe propertie services
  ) { }

  ngOnInit(): void {

    const id=this.route.snapshot.paramMap.get('id')//ON RECUPERE L'ID SERA EN PARAMETRE DE LA ROUTE
    this.propertiesServices.getSingleProperties(id).then (//Dans le fichier properties.service on execute la foction getSingle Property
   (property:Property)=>{ //on importe linterface
    this.property=property;
   }
    ).catch(

      (error)=>{

        console.error(error);
      }
    );
  }

}
