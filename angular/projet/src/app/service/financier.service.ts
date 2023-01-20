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
    let url = environment.FINANCIER_BASE_URL+environment.FINANCIER.validerPaiement; 
    console.log(url);
    return this.httpClient.post<any>(url,fiche);
  }

  get_liste_voiture_paiement(): Observable<any>{
    let url = environment.FINANCIER_BASE_URL+environment.FINANCIER.getListePaiement; 
    return this.httpClient.get<any>(url);
  }

}
