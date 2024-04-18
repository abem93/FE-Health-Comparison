import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { MapComponent } from '../../shared/components/map/map.component';
import { HospitalService } from '../../core/services/hospital.service';
import { Router, RouterModule } from '@angular/router';
import { ProcedureCostService } from '../../core/services/procedure-cost.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-procedure',
  standalone: true,
  imports: [SpinnerComponent, MapComponent, RouterModule],
  templateUrl: './procedure.component.html',
  styleUrl: './procedure.component.scss',
})
export class ProcedureComponent implements OnInit {
  isLoading: boolean = true;
  hospitals: any[] = [];
  selectedHospital: any[] = [];
  procedures = [];
  id: any = 0;
  procedureName: string = 'Procedure name';
  procedureCode: string = '';
  proccedurePrice: number = 0;
  sanitizedUrl: SafeResourceUrl = '';
  searchParam: string = '';

  constructor(private hospitalService: HospitalService, private router: Router, private procedureCostService: ProcedureCostService, private route: ActivatedRoute, public authService: AuthenticationService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadHospitals();
    setTimeout(() => {
      this.isLoading = false;
      if(this.selectedHospital == null){
        this.router.navigate(['']);
      }
      document.getElementById('price')?.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
    this.authService.isLoggedIn()
  }

  loadHospitals() {
    //Load the hospitals selected in Procedures list
    this.hospitalService.multipleHospitals$.subscribe((hospitals) => {
        this.selectedHospital = hospitals[0];
      })
      if(this.selectedHospital != null){
      this.setLinkForMaps(this.selectedHospital[0]);
      this.loadProcedure();
      }
  }

  loadProcedure() {
    this.procedureCostService.fetchProcedure(this.id).subscribe({
      next: (response: any) => {
        if (response && response.procedure_costs && response.procedure_costs.length > 0) {
          this.procedures = response.procedure_costs;
          // console.log(this.procedures);

          //set the procedure name and code
          const procedureName = response.procedure_costs[0].procedure.name;
          const procedureCode = response.procedure_costs[0].procedure.cpt_code;
          this.procedureName = procedureName;
          this.procedureCode = `(${procedureCode})`;

          //set the selected hospitals so only that data displays
          this.selectedHospitalsonly();
        } else {
          // Handle the case when response or procedure_costs is undefined
          console.log('Response or procedure_costs is undefined');
        }
      },
      error: (error: any) => {
        // Handle the error case
        console.error('Error fetching procedure:', error);
      }
    });
  }


  selectedHospitalsonly(){
    if(this.selectedHospital != null && this.procedures != null){
      this.procedures.forEach((procedure: any) => {
        this.selectedHospital.forEach((hospital: any) => {
          if(procedure.hospital.id == hospital.id){
            hospital.price = parseFloat(procedure.insurance_procedure_costs[0].price).toFixed(2);
          }
        })
      })
    }
  }

  addToFavorite(){

  }

  setLinkForMaps(hospital: any) {
    console.log('link', hospital);
    this.proccedurePrice = hospital.price;
    this.searchParam = `${hospital.hospital_name}, ${hospital.address.street_address}, ${hospital.address.city}, ${hospital.address.state} ${hospital.address.zipcode}`;
    this.searchParam = this.searchParam.replace(/ /g, '+');
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?width=800&height=800&hl=en&q=${this.searchParam}&ie=UTF8&t=&z=15&iwloc=B&output=embed`
    );
  }


}
