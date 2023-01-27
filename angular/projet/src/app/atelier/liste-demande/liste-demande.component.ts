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

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX - The Rise of Skywalker',
  ];
  

  constructor( private atelierService: AtelierService) { }

  ngOnInit(): void {
    this.getListeReparationTerminer();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
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
      // console.log(response.result);
      this.mess = response.result.message;
      this.etatpayement = response.result.etatpayement;
    })
    // console.log('huhu :', id);
  }

}
