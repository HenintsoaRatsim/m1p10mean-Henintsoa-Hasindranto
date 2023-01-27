import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtelierService } from 'src/app/service/atelier.service';

@Component({
  selector: 'app-reception-voiture',
  templateUrl: './reception-voiture.component.html',
  styleUrls: ['./reception-voiture.component.css']
})
export class ReceptionVoitureComponent implements OnInit {

  voitureListe: any;

  mess: any;

  constructor(private atelierService: AtelierService, private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.getListeVoitureReparer();
  }

  getListeVoitureReparer(){
    this.atelierService.get_liste_voiture_a_reparer()
    .subscribe(response => {
      this.voitureListe=response.result;
      // console.log('valiny: ', response.result);
      // console.log('valiny: ', response.result[0].datefiche);
      // console.log(response.data[0].etat);
    })
  }

  receptionner(id: any){
    this.atelierService.receptionner_voiture(id)
    .subscribe(response => {
      // console.log(response);
      this.mess = response.message;
      this.getListeVoitureReparer();
    })
    // console.log('huhu :', id);
    // this.router.navigate(['Atelier/liste_reception']); 
  }
}
