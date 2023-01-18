import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtelierService } from 'src/app/service/atelier.service';

@Component({
  selector: 'app-liste-receptionner',
  templateUrl: './liste-receptionner.component.html',
  styleUrls: ['./liste-receptionner.component.css']
})
export class ListeReceptionnerComponent implements OnInit {

  detailsFiche: any;

  constructor(private router: Router, private activated: ActivatedRoute, private atelierService: AtelierService) { }

  ngOnInit(): void {
    let id= this.activated.snapshot.params['idfiche'];
    this.getListeReceptionner(id);
  }
  getListeReceptionner(id:any){
    this.atelierService.receptionner_voiture(id);
    this.router.navigate(['Atelier/reception_voiture']); 
  }

}
