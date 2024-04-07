import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HospitalService } from '../../core/services/hospital.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-procedures-list',
  standalone: true,
  imports: [RouterModule, SpinnerComponent],
  templateUrl: './procedures-list.component.html',
  styleUrl: './procedures-list.component.scss'
})
export class ProceduresListComponent implements OnInit {
  isLoading: boolean = true;
  procedures: any[] = [];
  hospitals: any[] = [];

  constructor(private router: Router, private hospitalService: HospitalService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.loadHospitals()
  }

  // loadProcedure(){
  //   if(this.procedures.length < 2){
  //     this.router.navigate(['/procedure']);
  //   }
  // }

  loadHospitals(){
    this.hospitalService.getHospitals().subscribe({
      next: (response: any) => {
        this.hospitals = response
      }
    })
  }
}
