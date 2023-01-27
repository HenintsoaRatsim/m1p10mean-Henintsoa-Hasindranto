import { Component, OnInit } from '@angular/core';
import { FinancierService } from 'src/app/service/financier.service';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit {

  form: any = {
    idtypedepense: '63ce478cd795f36e9b6c5a65',
    montant: null,
    date: null
  }

  input: any = {
    intitule: null
  }

  listeTypeDepense: any;
  listeDepense: any;
  mess: any;

  constructor( private financierService: FinancierService) { }

  ngOnInit(): void {
    this.getListeTypeDepense();
    this.getListeDepense();
  }

  getListeTypeDepense(){
    this.financierService.get_type_depense()
    .subscribe(
      resultat => {
        this.listeTypeDepense = resultat.result;
        // console.log(resultat.result);
      }
    )
  }

  getListeDepense(){
    this.financierService.get_liste_depense()
    .subscribe(
      resultat => {
        this.listeDepense = resultat.result;
        // console.log(resultat.result);
      }
    )
  }

  OnSubmit(){

    console.log('donnee: ', this.form);
    this.financierService.ajout_depense(this.form)
    .subscribe((response) => {
      // console.log(response);
      this.getListeTypeDepense();
      this.getListeDepense();
      this.form.idtypedepense=null;
      this.form.montant=null;
      this.form.date=null;
    });

  }

  OnType(){

    console.log('donnee: ', this.input);
    this.financierService.ajout_type_depense(this.input)
    .subscribe((response) => {
      // console.log(response);
      // this.mess = response.result.message;
      this.getListeTypeDepense();
      this.getListeDepense();
      this.input.intitule=null;
    });
    

  }


}
