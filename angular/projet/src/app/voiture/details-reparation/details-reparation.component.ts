import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoitureService } from 'src/app/service/voiture.service';

@Component({
  selector: 'app-details-reparation',
  templateUrl: './details-reparation.component.html',
  styleUrls: ['./details-reparation.component.css']
})
export class DetailsReparationComponent implements OnInit {

  detailsFiche: any;
  huhu: any;

  constructor(private voitureService: VoitureService, private activated: ActivatedRoute) { }

  ngOnInit(): void {
    let id= this.activated.snapshot.params['idfiche'];
    this.getDetailFiche(id);
  }

  getDetailFiche(id:any){
    this.voitureService.get_fiche_detail(id)
    .subscribe(
      resultat => {
        this.detailsFiche = resultat;
        this.huhu= Array.of(this.detailsFiche);
        console.log(this.huhu);
        console.log(this.huhu[0].data.etat);
      }
    )
    // .subscribe((data) => {
    //   this.detailsFiche = data;
    //   console.log(data);
      
    // })
    // .subscribe(response => {
    //   this.huhu=response.data;
    //   console.log(response.data);
    //   console.log(response.data.voiture.matricule);
    // })
  }


}
