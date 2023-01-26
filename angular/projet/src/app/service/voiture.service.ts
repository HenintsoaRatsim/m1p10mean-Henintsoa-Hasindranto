import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private httpClient: HttpClient) { }

  ajout_voiture(form: any){
    let url = environment.GARAGE_BASE_URL+environment.VOITURE.ajoutVoiture; 
    return this.httpClient.post(url, form);
  }

  get_voiture_a_reparer(): Observable<any>{
    let url = environment.GARAGE_BASE_URL+environment.VOITURE.getVoitureAReparer; 
    return this.httpClient.get<any>(url);
  }

  get_historique(): Observable<any>{
    let url = environment.GARAGE_BASE_URL+environment.VOITURE.getHistorique; 
    return this.httpClient.get<any>(url);
  }

  get_fiche_detail(id:any): Observable<any>{
    let url = environment.GARAGE_BASE_URL+environment.VOITURE.getDetails+'/'+id; 
    return this.httpClient.get<any>(url);
  }

}
