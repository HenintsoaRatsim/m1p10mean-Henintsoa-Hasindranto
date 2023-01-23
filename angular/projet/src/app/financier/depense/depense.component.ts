import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrls: ['./depense.component.css']
})
export class DepenseComponent implements OnInit {

  form: any = {
    idtypedepense: null,
    montant: null,
    date: null
  }

  input: any = {
    intitule: null
  }

  constructor() { }

  ngOnInit(): void {
  }

  OnSubmit(){

    console.log('donnee: ', this.form);

  }

  OnType(){

    console.log('donnee: ', this.input);

  }


}
