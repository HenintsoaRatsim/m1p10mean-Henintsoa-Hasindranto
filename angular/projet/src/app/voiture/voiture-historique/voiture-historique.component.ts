import { Component, OnInit } from '@angular/core';
import { VoitureService } from 'src/app/service/voiture.service';

@Component({
  selector: 'app-voiture-historique',
  templateUrl: './voiture-historique.component.html',
  styleUrls: ['./voiture-historique.component.css']
})
export class VoitureHistoriqueComponent implements OnInit {

  historiqueListe: any;

  constructor(private voitureService: VoitureService) { }

  ngOnInit(): void {
    this.getListeHistorique();
  }

  getListeHistorique(){
    this.voitureService.get_historique()
    .subscribe(response => {
      this.historiqueListe=response.data;
      console.log(response.data);
    })
  
  }

  
}
