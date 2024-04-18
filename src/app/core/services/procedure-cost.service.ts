import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { ProcedureCost } from '../../shared/model/procedure-cost';

@Injectable({
  providedIn: 'root'
})
export class ProcedureCostService {
  private selectedProcedureSubject = new BehaviorSubject<any[]>([]);
  selectedProcedure$ = this.selectedProcedureSubject.asObservable();
  constructor(private http: HttpClient) { }

  fetchProcedure(data: any) {
    return this.http.get(`${environment.apiUrl}/procedure_costs`, { params: { id: data } });
  }

  setSelectedProcedure(procedureCosts: ProcedureCost[] ) {
    this.selectedProcedureSubject.next(procedureCosts);
  }
}
