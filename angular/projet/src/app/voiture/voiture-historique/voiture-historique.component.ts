import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoitureService } from 'src/app/service/voiture.service';

@Component({
  selector: 'app-voiture-historique',
  templateUrl: './voiture-historique.component.html',
  styleUrls: ['./voiture-historique.component.css']
})
export class VoitureHistoriqueComponent implements OnInit {

  historiqueListe: any;


  constructor(private voitureService: VoitureService, private router: Router) { }

  ngOnInit(): void {
    this.getListeHistorique();
  }

  getListeHistorique(){
    this.voitureService.get_historique()
    .subscribe(response => {
      this.historiqueListe=response.data; 
      // console.log(response.data);
    })
  
  }

  OnClick(idfiche: any){ 
    this.router.navigate(['Client/details_historique', idfiche]); 
  }

  
}
