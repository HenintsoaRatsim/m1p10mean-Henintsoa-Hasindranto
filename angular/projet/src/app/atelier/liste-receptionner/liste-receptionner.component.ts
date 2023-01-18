import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtelierService } from 'src/app/service/atelier.service';

@Component({
  selector: 'app-liste-receptionner',
  templateUrl: './liste-receptionner.component.html',
  styleUrls: ['./liste-receptionner.component.css']
})
export class ListeReceptionnerComponent implements OnInit {

  listeReceptionner: any;

  constructor(private router: Router, private activated: ActivatedRoute, private atelierService: AtelierService) { }

  ngOnInit(): void {
    // let id= this.activated.snapshot.params['idfiche'];
    // this.getListeReceptionner(id);

    this.getListeReceptionner();

  }
  // getListeReceptionner(id:any){
  //   this.atelierService.receptionner_voiture(id);
  //   console.log('id ao am liste: ', id);
  //   this.router.navigate(['Atelier/reception_voiture']); 
  // }

  getListeReceptionner(){
    this.atelierService.get_liste_voiture_receptionner()
    .subscribe(
      resultat => {
        this.listeReceptionner = resultat.result;
        console.log(resultat.result);
      }
    )
  }

  reparer(idvam: any){
    this.router.navigate(['Atelier/ajout_reparation', idvam]); 
  }

}
