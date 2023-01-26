import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AtelierService {

  constructor(private httpClient: HttpClient) { }

  get_liste_voiture_a_reparer(): Observable<any>{
    let url = environment.ATELIER_BASE_URL+environment.ATELIER.getListeVoitureAReparer; 
    return this.httpClient.get<any>(url);
  }

  get_liste_reparation_terminer(): Observable<any>{
    let url = environment.ATELIER_BASE_URL+environment.ATELIER.listeterminer; 
    return this.httpClient.get<any>(url);
  }

  receptionner_voiture(fiche: any): Observable<any>{
    let url = environment.ATELIER_BASE_URL+environment.ATELIER.receptionnerVoiture+'/'+fiche; 
    console.log(url);
    return this.httpClient.get<any>(url);
  }

  valider_bon_de_sortie(fiche: any): Observable<any>{
    let url = environment.ATELIER_BASE_URL+environment.ATELIER.validerBonSortie+'/'+fiche; 
    console.log(url);
    return this.httpClient.get<any>(url);
  }

  get_liste_voiture_receptionner(): Observable<any>{
    let url = environment.ATELIER_BASE_URL+environment.ATELIER.getListeVoitureReceptionner; 
    return this.httpClient.get<any>(url);
  }

  get_liste_voiture_en_reparation(): Observable<any>{
    let url = environment.ATELIER_BASE_URL+environment.ATELIER.voitureEnReparation; 
    return this.httpClient.get<any>(url);
  }

  ajout_reparation(form: any){
    let url = environment.ATELIER_BASE_URL+environment.ATELIER.ajoutReparation; 
    return this.httpClient.post(url, form);
  }

  ajout_avancement(form: any){
    let url = environment.ATELIER_BASE_URL+environment.ATELIER.ajoutAvancement; 
    return this.httpClient.post(url, form);
  }


}
