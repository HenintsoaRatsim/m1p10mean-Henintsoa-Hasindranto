import { Component, OnInit } from '@angular/core';
import { FinancierService } from 'src/app/service/financier.service';

@Component({
  selector: 'app-liste-paiement',
  templateUrl: './liste-paiement.component.html',
  styleUrls: ['./liste-paiement.component.css']
})
export class ListePaiementComponent implements OnInit {

  listePaiement: any;

  form: any={
    idfiche: null,
    date: null
  }

  mess: any;

  constructor( private financierService: FinancierService) { }

  ngOnInit(): void {
    this.getListeVoiturePaiement();
  }

  getListeVoiturePaiement(){
    this.financierService.get_liste_voiture_paiement()
    .subscribe(
      resultat => {
        this.listePaiement = resultat.result;
        // console.log(resultat.result);
      }
    )
  }

  OnPaiement(idfiche:any){
    this.form.idfiche=idfiche;
    console.log('donnee date: ', this.form);
    this.financierService.valider_paiement(this.form)
    .subscribe((response) => {
      // console.log(response);
      this.mess=response.message;
      this.getListeVoiturePaiement();
      
    });    
  }


}
