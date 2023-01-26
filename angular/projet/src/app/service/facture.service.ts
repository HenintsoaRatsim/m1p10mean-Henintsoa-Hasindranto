import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private httpClient: HttpClient) { }

  get_facture(id:any): Observable<any>{
    let url = environment.FACTURE_BASE_URL+environment.FACTURE.getFactureFiche+'/'+id; 
    return this.httpClient.get<any>(url);
  }

}
