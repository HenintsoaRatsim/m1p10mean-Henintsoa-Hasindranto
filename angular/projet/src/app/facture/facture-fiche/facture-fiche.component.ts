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

  constructor(private factureService: FactureService, private activated: ActivatedRoute) { }

  ngOnInit(): void {
    let id= this.activated.snapshot.params['idfiche'];
    this.getFacture(id);
  }
  
  getFacture(id:any){
    this.factureService.get_facture(id)
    .subscribe(
      resultat => {
        this.detailsFacture = resultat.data.detailfacture.voiture;
        this.detailsReparation = resultat.etatpayement;
        this.voiture= Array.of(resultat.data.detailfacture.voiture);
        console.log(this.detailsFacture);     
        console.log(this.detailsReparation);
        console.log(this.voiture);    
      }
    )
  }

}
