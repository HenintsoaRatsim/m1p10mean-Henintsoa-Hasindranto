import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { FinancierService } from 'src/app/service/financier.service';

@Component({
  selector: 'app-temps-moyenne',
  templateUrl: './temps-moyenne.component.html',
  styleUrls: ['./temps-moyenne.component.css']
})
export class TempsMoyenneComponent implements OnInit {

  tempsMoyenne: any;
  tempsTotal: any;
  listeReparation: any;
  detailsVoiture: any;
  client: any;

  constructor( private activated: ActivatedRoute, private financierService: FinancierService) { }

  ngOnInit(): void {
    let id= this.activated.snapshot.params['idfiche'];
    this.getListeTermine(id);
  }

  getListeTermine(idfiche: any){
    this.financierService.get_temps_moyenne(idfiche)
    .subscribe(
      resultat => {
        this.tempsMoyenne = resultat.result.tempsMoyenne;
        this.tempsTotal = resultat.result.tempsTotal;
        this.listeReparation = resultat.result.reparations;
        this.detailsVoiture = resultat.result.fiche[0].voiture;
        this.client = resultat.result.fiche[0].user;
        // console.log(resultat.result);
        // console.log(this.tempsMoyenne);
        // console.log(this.tempsTotal);
        // console.log(this.listeReparation);
        // console.log(this.detailsVoiture);
        // console.log(this.client);
      }
    )
  }

}
