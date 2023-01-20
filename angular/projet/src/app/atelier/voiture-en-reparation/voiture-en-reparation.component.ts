import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtelierService } from 'src/app/service/atelier.service';

@Component({
  selector: 'app-voiture-en-reparation',
  templateUrl: './voiture-en-reparation.component.html',
  styleUrls: ['./voiture-en-reparation.component.css']
})
export class VoitureEnReparationComponent implements OnInit {

  listeEnReparation: any;

  constructor(private router: Router, private activated: ActivatedRoute, private atelierService: AtelierService) { }

  ngOnInit(): void {
    this.getListeVoitureEnReparation();
  }

  getListeVoitureEnReparation(){
    this.atelierService.get_liste_voiture_en_reparation()
    .subscribe(
      resultat => {
        this.listeEnReparation = resultat.result;
        console.log(resultat.result);
      }
    )
  }

  reparer(idfiche: any){
    this.router.navigate(['Atelier/ajout_reparation', idfiche]); 
  }

}
