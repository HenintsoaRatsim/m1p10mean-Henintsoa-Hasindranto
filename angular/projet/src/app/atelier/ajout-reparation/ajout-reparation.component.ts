import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtelierService } from 'src/app/service/atelier.service';

@Component({
  selector: 'app-ajout-reparation',
  templateUrl: './ajout-reparation.component.html',
  styleUrls: ['./ajout-reparation.component.css']
})
export class AjoutReparationComponent implements OnInit {

  form: any = {
    intitule: null,
    description: null,
    prix: null,
    idvam: null
  }


  constructor(private router: Router, private atelierService: AtelierService, private activated: ActivatedRoute) { }

  ngOnInit(): void {

  }

  OnSubmit(){
    this.form.idvam= this.activated.snapshot.params['idvoiture'];
    console.log('donnee entree: ', this.form);
    this.atelierService.ajout_reparation(this.form)
    .subscribe((response) => {
      console.log(response);
      this.router.navigate(['Atelier/ajout_reparation', this.form.idvam]);
    });
    this.form.intitule=null;
    this.form.description=null;
    this.form.prix=null;
    this.form.idvam=null;
    
  }

}
