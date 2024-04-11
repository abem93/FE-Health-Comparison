import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { MapComponent } from '../../shared/components/map/map.component';
import { Hospital } from '../../shared/model/hospital';
import { HospitalService } from '../../core/services/hospital.service';
import { Router, RouterModule } from '@angular/router';
import { ProcedureService } from '../../core/services/procedure.service';


@Component({
  selector: 'app-procedure',
  standalone: true,
  imports: [SpinnerComponent, MapComponent, RouterModule],
  templateUrl: './procedure.component.html',
  styleUrl: './procedure.component.scss',
})
export class ProcedureComponent implements OnInit {
  isLoading: boolean = true;
  hospitals: Hospital[] = [];
  procedure: any;

  constructor(private hospitalService: HospitalService, private router: Router, private procedureService: ProcedureService) {}

  ngOnInit(): void {
    this.loadHospitals();
    this.loadProcedure();
    setTimeout(() => {
      this.isLoading = false;
      if(this.hospitals == null){
        this.router.navigate(['']);
      }
      document.getElementById('price')?.scrollIntoView({ behavior: 'smooth' });
    }, 2000);


  }

  loadHospitals() {
    this.hospitalService.multipleHospitals$.subscribe((hospitals) => {
      this.hospitals = hospitals[0];
    })
  }

  loadProcedure() {

  }

}
