import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoitureService } from 'src/app/service/voiture.service';

@Component({
  selector: 'app-details-reparation',
  templateUrl: './details-reparation.component.html',
  styleUrls: ['./details-reparation.component.css']
})
export class DetailsReparationComponent implements OnInit {

  detailsFiche: any;
  voiture: any;
  idFiche: any;

  constructor(private voitureService: VoitureService, private activated: ActivatedRoute, private router: Router) { }

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
        console.log(this.detailsFiche);
        console.log(this.idFiche);
        console.log(this.voiture);
      }
    )
  }

  OnClick(idfiche: any){ 
    this.router.navigate(['Client/facture_fiche', idfiche]); 
  }

}
