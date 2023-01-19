import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtelierService } from 'src/app/service/atelier.service';
import { VoitureService } from 'src/app/service/voiture.service';

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
    idfiche: null
  }

  detailsFiche: any;
  voiture: any;
  idFiche: any;

  input: any={
    idreparation: null,
    date: null
  }

  entre: any={
    idreparation: null,
    avancement: null
  }


  constructor(
    private router: Router,
    private atelierService: AtelierService, 
    private activated: ActivatedRoute, 
    private voitureService: VoitureService
    ) { }

  ngOnInit(): void {
    let id= this.activated.snapshot.params['idfiche'];
    this.getDetailFiche(id);
  }

  getDetailFiche(id:any){
    this.voitureService.get_fiche_detail(id)
    .subscribe(
      resultat => {
        this.detailsFiche = resultat.data.reparations;
        this.voiture= Array.of(resultat.data.voiture);
        this.idFiche= Array.of(resultat.data._id);
        console.log(resultat.data);
        console.log(resultat.data.reparations[0].etatareparation);
        console.log(this.detailsFiche);
        console.log(this.idFiche);
        console.log(this.voiture);
      }
    )
  }

  OnSubmit(){
    let id= this.form.idfiche= this.activated.snapshot.params['idfiche'];
    console.log('donnee entree: ', this.form);
    this.atelierService.ajout_reparation(this.form)
    .subscribe((response) => {
      console.log(response);
      // this.router.navigate(['Atelier/liste_reception']);
      // window.location.reload();
      this.getDetailFiche(id);
    });
    // this.form.intitule=null;
    // this.form.description=null;
    // this.form.prix=null;
    
  }

  OnDate(){
    let id= this.form.idfiche= this.activated.snapshot.params['idfiche'];
    console.log('donnee date: ', this.input);
    this.atelierService.ajout_reparation(this.input)
    .subscribe((response) => {
      console.log(response);
      this.getDetailFiche(id);
    });
    // this.form.intitule=null;
    // this.form.description=null;
    // this.form.prix=null;
    
  }

  OnAvancement(){
    let id= this.form.idfiche= this.activated.snapshot.params['idfiche'];
    console.log('donnee avacement: ', this.entre);
    // this.atelierService.ajout_reparation(this.entre)
    // .subscribe((response) => {
    //   console.log(response);
    //   this.getDetailFiche(id);
    // });
    // this.form.intitule=null;
    // this.form.description=null;
    // this.form.prix=null;
    
  }

}
