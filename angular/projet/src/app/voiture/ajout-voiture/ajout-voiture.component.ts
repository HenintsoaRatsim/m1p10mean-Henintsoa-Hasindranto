import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoitureService } from 'src/app/service/voiture.service';

@Component({
  selector: 'app-ajout-voiture',
  templateUrl: './ajout-voiture.component.html',
  styleUrls: ['./ajout-voiture.component.css']
})
export class AjoutVoitureComponent implements OnInit {

  form: any = {
    matricule: null,
    marque: null,
    type: null,
    datefiche: null
  }

  constructor(private router: Router, private voitureService: VoitureService) { }

  ngOnInit(): void {
  }

  OnSubmit(){
    console.log('donnee entree: ', this.form);
    this.voitureService.ajout_voiture(this.form)
    .subscribe((response) => {
      console.log(response);
      this.router.navigate(['Client/reparation_voiture']);
    });
  }

}
