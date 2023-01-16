import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private httpClient: HttpClient) { }

  ajout_voiture(form: any){
    let url = environment.GARAGE_BASE_URL+environment.VOITURE.ajoutVoiture; 
    return this.httpClient.post(url, form);
  }

  get_voiture_a_reparer(){
    let url = environment.GARAGE_BASE_URL+environment.VOITURE.getVoitureAReparer; 
    return this.httpClient.get(url);
  }

}
