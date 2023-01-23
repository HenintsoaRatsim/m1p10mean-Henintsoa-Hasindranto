import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinancierService } from 'src/app/service/financier.service';

@Component({
  selector: 'app-chiffre-affaire',
  templateUrl: './chiffre-affaire.component.html',
  styleUrls: ['./chiffre-affaire.component.css']
})
export class ChiffreAffaireComponent implements OnInit {

  listeChiffre: any;

  form: any={
    filtre: null
  }

  constructor(private router: Router, private activated: ActivatedRoute, private financierService: FinancierService) { }

  ngOnInit(): void {
    this.getChiffreAffaire()
  }

  getChiffreAffaire(){
    console.log('donnee date: ', this.form);
    this.financierService.chiffre_affaire(this.form)
    .subscribe(
      resultat => {
        this.listeChiffre = resultat.result;
        console.log(resultat.result);
      }
    )
  }

  // OnFiltre(){
  //   console.log('donnee date: ', this.form);
  //   this.financierService.chiffre_affaire(this.form)
  //   .subscribe(
  //     resultat => {
  //       this.listeChiffre = resultat.result;
  //       console.log(resultat.result);
  //       this.getChiffreAffaire();
  //     }
  //   )
  // }

}
