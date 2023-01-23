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

  chiffre_affaire(filtre: any): Observable<any>{
    let url = environment.FINANCIER_BASE_URL+environment.FINANCIER.getChiffreAffaire; 
    console.log(url);
    return this.httpClient.post<any>(url,filtre);
  }

  ajout_type_depense(intitule: any): Observable<any>{
    let url = environment.FINANCIER_BASE_URL+environment.FINANCIER.ajoutType; 
    console.log(url);
    return this.httpClient.post<any>(url,intitule);
  }

  ajout_depense(form: any): Observable<any>{
    let url = environment.FINANCIER_BASE_URL+environment.FINANCIER.ajoutDepense; 
    console.log(url);
    return this.httpClient.post<any>(url,form);
  }

  get_liste_voiture_paiement(): Observable<any>{
    let url = environment.FINANCIER_BASE_URL+environment.FINANCIER.getListePaiement; 
    return this.httpClient.get<any>(url);
  }

  get_liste_termine(): Observable<any>{
    let url = environment.FINANCIER_BASE_URL+environment.FINANCIER.getListeTermine; 
    return this.httpClient.get<any>(url);
  }

  get_type_depense(): Observable<any>{
    let url = environment.FINANCIER_BASE_URL+environment.FINANCIER.getTypeDepense; 
    return this.httpClient.get<any>(url);
  }

  get_liste_depense(): Observable<any>{
    let url = environment.FINANCIER_BASE_URL+environment.FINANCIER.getListeDepense; 
    return this.httpClient.get<any>(url);
  }

  get_temps_moyenne(fiche: any): Observable<any>{
    let url = environment.FINANCIER_BASE_URL+environment.FINANCIER.getTempsMoyenne+'/'+fiche; 
    return this.httpClient.get<any>(url);
  }


}
