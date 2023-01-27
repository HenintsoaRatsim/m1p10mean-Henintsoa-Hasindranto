import { Component, OnInit } from '@angular/core';
import { FinancierService } from 'src/app/service/financier.service';

@Component({
  selector: 'app-benefice',
  templateUrl: './benefice.component.html',
  styleUrls: ['./benefice.component.css']
})
export class BeneficeComponent implements OnInit {

  listeBenefice: any;

  loading !: boolean;

  form: any={
    mois: '1',
    annee: '2019'
  }

  constructor(private financierService: FinancierService) { }

  ngOnInit(): void {
    this.getListeBenefice();
  }

  getListeBenefice(){
    this.financierService.get_benefice(this.form)
    .subscribe(
      resultat => {
        this.listeBenefice = resultat.result;
        // console.log(resultat.result);
        this.loading=false;
      }
    )
  }
  
  OnButton(){
    this.loading=true;
    this.getListeBenefice();
  }
 
}
