import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancierService } from 'src/app/service/financier.service';

@Component({
  selector: 'app-benefice',
  templateUrl: './benefice.component.html',
  styleUrls: ['./benefice.component.css']
})
export class BeneficeComponent implements OnInit {

  listeBenefice: any;

  form: any={
    mois: null,
    annee: null
  }

  constructor(private router: Router, private activated: ActivatedRoute, private financierService: FinancierService) { }

  ngOnInit(): void {
    this.getListeBenefice();
  }

  getListeBenefice(){
    console.log('donnee date: ', this.form);
    this.financierService.get_benefice(this.form)
    .subscribe(
      resultat => {
        this.listeBenefice = resultat.result;
        console.log(resultat.result);
      }
    )
  }
 
}
