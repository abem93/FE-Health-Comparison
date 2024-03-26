import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private selectedHospitalSubject = new BehaviorSubject<any>(null);
  selectedHospital$ = this.selectedHospitalSubject.asObservable();

  constructor(private http: HttpClient) { }

  getHospitals() {
    return this.http.get(`${environment.apiUrl}/hospitals`);
  }
  setSelectedHospital(hospital: any) {
    this.selectedHospitalSubject.next(hospital);
  }
}
