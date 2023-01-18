import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class AtelierService {

  constructor(private httpClient: HttpClient) { }

  get_liste_voiture_a_reparer(): Observable<any>{
    let url = environment.ATELIER_BASE_URL+environment.ATELIER.getListeVoitureAReparer; 
    return this.httpClient.get<any>(url);
  }

  receptionner_voiture(fiche: any): Observable<any>{
    let url = environment.ATELIER_BASE_URL+environment.ATELIER.receptionnerVoiture+'?idfiche='+fiche; 
    return this.httpClient.get<any>(url);
  }

}
