import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactureService } from 'src/app/service/facture.service';

@Component({
  selector: 'app-facture-fiche',
  templateUrl: './facture-fiche.component.html',
  styleUrls: ['./facture-fiche.component.css']
})
export class FactureFicheComponent implements OnInit {

  detailsFacture: any;
  detailsReparation: any;
  voiture: any;
  detailsUser: any;
  somme: any;
  etat: any;

  constructor(private factureService: FactureService, private activated: ActivatedRoute) { }

  ngOnInit(): void {
    let id= this.activated.snapshot.params['idfiche'];
    this.getFacture(id);
  }
  
  getFacture(id:any){
    this.factureService.get_facture(id)
    .subscribe(
      resultat => {
        this.detailsFacture = resultat.data;
        this.detailsReparation = resultat.data.detailfacture.reparations;
        this.voiture= Array.of(resultat.data.detailfacture.voiture);
        this.detailsUser= Array.of(resultat.data.detailfacture.user);
        this.somme= Array.of(resultat.data.montantapayer);
        this.etat= Array.of(resultat.data.detailfacture.etatpayement);
        console.log(this.detailsFacture);     
        console.log(this.detailsReparation);
        console.log(this.voiture);    
        console.log(this.detailsUser);    
        console.log(this.somme);
        console.log(this.etat);
      }
    )
  }

}
