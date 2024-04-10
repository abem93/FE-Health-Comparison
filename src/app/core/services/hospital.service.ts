import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, tap } from 'rxjs';
import { Hospital } from '../../shared/model/hospital';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private selectedHospitalSubject = new BehaviorSubject<any>(null);
  private multipleHospitalsSubject = new BehaviorSubject<any[]>([]);
  selectedHospital$ = this.selectedHospitalSubject.asObservable();
  multipleHospitals$ = this.multipleHospitalsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getHospitals() {
    return this.http.get(`${environment.apiUrl}/hospitals`);
  }
  setSelectedHospital(hospital: Hospital) {
    this.selectedHospitalSubject.next(hospital);
  }

  selectMultipleHospitals(hospitals: Hospital[]) {
    this.selectedHospitalSubject.next(hospitals);
  }
}
