import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private router: Router, private activated: ActivatedRoute, private financierService: FinancierService) { }

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
        this.listeReparation = resultat.result.reparation;
        console.log(resultat.result);
      }
    )
  }

}
