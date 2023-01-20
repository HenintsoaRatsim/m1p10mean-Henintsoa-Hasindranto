import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtelierService } from 'src/app/service/atelier.service';

@Component({
  selector: 'app-liste-demande',
  templateUrl: './liste-demande.component.html',
  styleUrls: ['./liste-demande.component.css']
})
export class ListeDemandeComponent implements OnInit {

  listeDemande: any;

  constructor(private router: Router, private activated: ActivatedRoute, private atelierService: AtelierService) { }

  ngOnInit(): void {
    this.getListeReceptionner();
  }

  getListeReceptionner(){
    this.atelierService.get_demande_sortie()
    .subscribe(
      resultat => {
        this.listeDemande = resultat.result;
        console.log(resultat.result);
      }
    )
  }

}
