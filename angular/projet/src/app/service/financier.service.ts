import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class FinancierService {

  constructor(private httpClient: HttpClient) { }

  valider_paiement(fiche: any): Observable<any>{
    let url = environment.ATELIER_BASE_URL+environment.ATELIER.receptionnerVoiture+'/'+fiche; 
    console.log(url);
    return this.httpClient.get<any>(url);
  }

}
