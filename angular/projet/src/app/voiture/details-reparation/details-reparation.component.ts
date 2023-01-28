import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
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
  etatfiche: any;

  mess: any;

  constructor(
    private voitureService: VoitureService, 
    private activated: ActivatedRoute, 
    private router: Router, 
    private userService: UserService
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
        this.idFiche= resultat.data._id;
        this.etatfiche= resultat.data.etat;
        // console.log(resultat);
        // console.log(this.detailsFiche);
        // console.log(this.idFiche);
        // console.log(this.voiture);
      }
    )
  }

  OnClick(idfiche: any){ 
    this.router.navigate(['Client/facture_fiche', idfiche]); 
  }

  OnRecuperer(idfiche: any){ 
    this.userService.recuperer_voiture(idfiche)
    .subscribe(
      response => {
        this.mess = response.message;
        console.log(response.message);
        this.getDetailFiche(idfiche);
      }
    )
  }

}
