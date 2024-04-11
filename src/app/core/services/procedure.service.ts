import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Procedure } from '../../shared/model/procedure';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {
  private selectedProcedureSubject = new BehaviorSubject<any>(null);
  private procedureSearchSubject = new BehaviorSubject<any[]>([]);
  selectedProcedure$ = this.selectedProcedureSubject.asObservable();
  procedureSearchSubject$ = this.procedureSearchSubject.asObservable();
  constructor(private http: HttpClient) { }

  getProcedures(data: any) {
    return this.http.get(`${environment.apiUrl}/procedures/`, { params: { name: data.name } });
  }

  procedureSearchResult(procedures: Procedure[]) {
    this.procedureSearchSubject.next(procedures);
  }
  setSelectedProcedure(procedure: Procedure) {
    this.selectedProcedureSubject.next(procedure);
  }
}
