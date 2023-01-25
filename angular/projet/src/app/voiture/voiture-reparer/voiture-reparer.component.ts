import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoitureService } from 'src/app/service/voiture.service';


@Component({
  selector: 'app-voiture-reparer',
  templateUrl: './voiture-reparer.component.html',
  styleUrls: ['./voiture-reparer.component.css']
})
export class VoitureReparerComponent implements OnInit {

  voitureListe: any;
  loading = false;

  constructor(private voitureService: VoitureService, private router: Router) {  }

  ngOnInit(): void {
    this.getVoitureReparerListe();
  }

  getVoitureReparerListe(){
    this.voitureService.get_voiture_a_reparer()
    .subscribe(response => {
      this.voitureListe=response.data;
      // console.log(response.data);
      // console.log(response.data[0].etat);
    })
  }

  OnClick(idfiche: any){ 
    this.router.navigate(['Client/details_reparation', idfiche]); 
  }

}
