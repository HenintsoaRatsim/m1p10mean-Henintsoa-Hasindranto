import { Component, OnInit } from '@angular/core';
import { VoitureService } from 'src/app/service/voiture.service';

@Component({
  selector: 'app-details-reparation',
  templateUrl: './details-reparation.component.html',
  styleUrls: ['./details-reparation.component.css']
})
export class DetailsReparationComponent implements OnInit {

  detailsFiche: any;

  constructor(private voitureService: VoitureService) { }

  ngOnInit(): void {
    this.getDetailFiche();
  }

  getDetailFiche(){
    this.voitureService.get_fiche_detail()
    .subscribe(response => {
      this.detailsFiche=response.data;
      console.log(response.data);
    })
  
  }


}
