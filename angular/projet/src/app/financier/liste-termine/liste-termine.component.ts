import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancierService } from 'src/app/service/financier.service';

@Component({
  selector: 'app-liste-termine',
  templateUrl: './liste-termine.component.html',
  styleUrls: ['./liste-termine.component.css']
})
export class ListeTermineComponent implements OnInit {

  listeTermine: any;

  constructor(private router: Router, private activated: ActivatedRoute, private financierService: FinancierService) { }

  ngOnInit(): void {
    this.getListeTermine();
  }

  getListeTermine(){
    this.financierService.get_liste_termine()
    .subscribe(
      resultat => {
        this.listeTermine = resultat.result;
        console.log(resultat.result);
      }
    )
  }

  VoirTemps(idfiche: any){ 
    this.router.navigate(['Financier/temps_moyenne', idfiche]); 
  }

}
