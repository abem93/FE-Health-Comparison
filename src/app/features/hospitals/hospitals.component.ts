import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HospitalService } from '../../core/services/hospital.service';
import { Hospital } from '../../shared/model/hospital';
import { HospitalDetailComponent } from '../hospital-detail/hospital-detail.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hospitals',
  standalone: true,
  imports: [HospitalDetailComponent],
  templateUrl: './hospitals.component.html',
  styleUrl: './hospitals.component.scss'
})
export class HospitalsComponent implements OnInit, AfterViewInit {
  hospitals : Hospital[] = [];
  showDetails : boolean = false;


  constructor(private hospitalService: HospitalService, private router: Router){}

  ngOnInit(): void {
    this.showDetails = false;
    this.loadHospitals()
  }

  ngAfterViewInit(): void {

  }

  loadHospitals(){
    this.hospitalService.getHospitals().subscribe({
      next: (response: any) => {
        this.hospitals = response
      }
    })
  }

  showHospitalDetails(hospital: Hospital) {
    this.hospitalService.setSelectedHospital(hospital)
    this.showDetails = true;
    this.router.navigate(['/hospitals/details', hospital.id]);
    setTimeout(() => {
      document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }
}
