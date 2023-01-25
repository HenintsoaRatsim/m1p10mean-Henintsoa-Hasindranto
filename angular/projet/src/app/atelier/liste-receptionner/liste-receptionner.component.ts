import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AtelierService } from 'src/app/service/atelier.service';

@Component({
  selector: 'app-liste-receptionner',
  templateUrl: './liste-receptionner.component.html',
  styleUrls: ['./liste-receptionner.component.css']
})
export class ListeReceptionnerComponent implements OnInit {

  listeReceptionner: any;

  constructor(private router: Router, private atelierService: AtelierService) { }

  ngOnInit(): void {
    this.getListeReceptionner();
  }
  

  getListeReceptionner(){
    this.atelierService.get_liste_voiture_receptionner()
    .subscribe(
      resultat => {
        this.listeReceptionner = resultat.result;
        // console.log(resultat.result);
      }
    )
  }

  reparer(idfiche: any){
    this.router.navigate(['Atelier/ajout_reparation', idfiche]); 
  }


}
