import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../core/services/hospital.service';
import { Hospital } from '../../shared/model/hospital';


@Component({
  selector: 'app-hospitals',
  standalone: true,
  imports: [],
  templateUrl: './hospitals.component.html',
  styleUrl: './hospitals.component.scss'
})
export class HospitalsComponent implements OnInit {
  hospitals : Hospital[] = []
  constructor(private hospitalService: HospitalService){}

  ngOnInit(): void {
    this.loadHospitals()
  }

  loadHospitals(){
    this.hospitalService.getHospitals().subscribe({
      next: (response: any) => {
        this.hospitals = response
      }
    })
  }
}
