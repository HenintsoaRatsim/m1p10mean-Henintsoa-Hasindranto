import { Component, OnInit } from '@angular/core';
import { VoitureService } from 'src/app/service/voiture.service';

@Component({
  selector: 'app-voiture-reparer',
  templateUrl: './voiture-reparer.component.html',
  styleUrls: ['./voiture-reparer.component.css']
})
export class VoitureReparerComponent implements OnInit {

  voitureListe: any;

  constructor(private voitureService: VoitureService) { }

  ngOnInit(): void {
    this.getVoitureReparerListe();
  }

  getVoitureReparerListe(){
    this.voitureService.get_voiture_a_reparer()
    .subscribe(response => {
      this.voitureListe=response.data;
      console.log(response.data);
      // console.log(response.data[0].etat);
    })
    // .subscribe(data =>{
    //   this.voitureListe=data;
    //   console.log(this.voitureListe);
    //   console.log('etat oh: '+ this.voitureListe.etat);
    // })
  //   .subscribe((data: any) => {
  //     this.voitureResults = data;
  //     // this.voitureListe = this.voitureResults.results;
  //     console.log(this.voitureResults);
  // });
  }

}
