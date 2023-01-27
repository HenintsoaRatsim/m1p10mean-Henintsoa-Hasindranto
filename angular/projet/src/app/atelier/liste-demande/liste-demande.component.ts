import { Component, OnInit } from '@angular/core';
import { AtelierService } from 'src/app/service/atelier.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-liste-demande',
  templateUrl: './liste-demande.component.html',
  styleUrls: ['./liste-demande.component.css']
})
export class ListeDemandeComponent implements OnInit {

  listeDemande: any;
  mess: any;
  etatpayement: any;
  success: any;
  

  constructor( private atelierService: AtelierService) { }

  ngOnInit(): void {
    this.getListeReparationTerminer();
  }

 

  getListeReparationTerminer(){
    this.atelierService.get_liste_reparation_terminer()
    .subscribe(
      resultat => {
        this.listeDemande = resultat.result;
        // console.log(resultat.result);
        // console.log(resultat.result[0].etatpayement);
      }
    )
  }

  ValiderSortie(id: any){
    this.atelierService.valider_bon_de_sortie(id)
    .subscribe(response => {
      this.getListeReparationTerminer();
      console.log(response.success);
      this.mess = response.result.message;
      this.success = response.success;
      this.etatpayement = response.result.etatpayement;
    })
    // console.log('huhu :', id);
  }

}
