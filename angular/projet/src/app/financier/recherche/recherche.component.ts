import { Component, OnInit } from '@angular/core';
import { FinancierService } from 'src/app/service/financier.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {

  listeRecherche: any;

  form: any={
    datedebut: null,
    datefin: null
  }

  loading !: boolean;


  constructor( private financierService: FinancierService) { }

  ngOnInit(): void {
    this.getRecherche();
  }

  getRecherche(){
    console.log('donnee date: ', this.form);
    this.financierService.get_recherche(this.form)
    .subscribe(
      resultat => {
        this.listeRecherche = resultat.result;
        // console.log(resultat);
        this.loading=false;
      }
    )
  }

  OnButton(){
    this.loading=true;
    this.getRecherche();
  }

}
