import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AtelierService } from 'src/app/service/atelier.service';
import { VoitureService } from 'src/app/service/voiture.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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

  input: any={
    idreparation: null,
    date: null
  }

  entre: any={
    idreparation: null,
    avancement: null
  }

  haha: any={
    idreparation: null,
    date: null
  }

  mess: any;
  success: any;

  constructor(
    private atelierService: AtelierService, 
    private activated: ActivatedRoute, 
    private voitureService: VoitureService
    ) { }

  ngOnInit(): void {
    let id= this.activated.snapshot.params['idfiche'];
    this.getDetailFiche(id);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.detailsFiche, event.previousIndex, event.currentIndex);
  }

  getDetailFiche(id:any){
    this.voitureService.get_fiche_detail(id)
    .subscribe(
      resultat => {
        this.detailsFiche = resultat.data.reparations;
        this.voiture= resultat.data.voiture.matricule;
        // this.idFiche= Array.of(resultat.data._id);
        // console.log(resultat.data);
        // console.log(resultat.data.reparations[0].etatareparation);
        // console.log(this.detailsFiche);
        // console.log(this.idFiche);
        // console.log(this.voiture);
      }
    )
  }

  OnSubmit(){
    let id= this.activated.snapshot.params['idfiche'];
    this.form.idfiche= id;
    console.log('donnee entree: ', this.form);
    this.atelierService.ajout_reparation(this.form)
    .subscribe((response) => {
      console.log(response);
      this.mess = response;
      this.success = response;
      this.form.intitule=null;
      this.form.description=null;
      this.form.prix=null;
      this.form.idfiche=null;
      this.getDetailFiche(id);
    });
    
    
  }

  OnDate(idrep:any){
    let id= this.activated.snapshot.params['idfiche'];
    this.input.idreparation=idrep;
    console.log('donnee date: ', this.input);
    this.atelierService.ajout_avancement(this.input)
    .subscribe((response) => {
      // console.log(response);
      this.getDetailFiche(id);
      
    });    
  }

  OnAvancement(idrep:any){    
    let id= this.activated.snapshot.params['idfiche'];
    this.entre.idreparation=idrep;
    console.log('donnee avacement: ', this.entre);
    this.atelierService.ajout_avancement(this.entre)
    .subscribe((response) => {
      // console.log(response);
      this.getDetailFiche(id);
      
    });
    
  }

  OnDateFin(idrep:any){
    let id= this.activated.snapshot.params['idfiche'];
    this.haha.idreparation=idrep;
    console.log('donnee date: ', this.haha);
    this.atelierService.ajout_avancement(this.haha)
    .subscribe((response) => {
      // console.log(response);
      this.getDetailFiche(id);
      
    });    
  }

}
