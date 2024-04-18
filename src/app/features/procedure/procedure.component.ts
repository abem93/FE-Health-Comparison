import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { MapComponent } from '../../shared/components/map/map.component';
import { HospitalService } from '../../core/services/hospital.service';
import { Router, RouterModule } from '@angular/router';
import { ProcedureCostService } from '../../core/services/procedure-cost.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Chart, ChartType } from 'chart.js/auto';
Chart.register(ChartDataLabels);
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { OnDestroy } from '@angular/core';
import { map } from 'rxjs';


@Component({
  selector: 'app-procedure',
  standalone: true,
  imports: [SpinnerComponent, MapComponent, RouterModule],
  templateUrl: './procedure.component.html',
  styleUrl: './procedure.component.scss',
})
export class ProcedureComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  hospitals: any[] = [];
  selectedHospital: any[] = [];
  procedures = [];
  id: any = 0;
  procedureName: string = 'Procedure name';
  procedureCode: string = '';
  proccedurePrice: number;
  sanitizedUrl: SafeResourceUrl = '';
  searchParam: string = '';
  public priceBarGraph: Chart;
  chartlabels: string[] = [];
  chartdata: number[] = [];

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
    this.proccedurePrice
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
      this.setChartData();
    }

  }

  addToFavorite(){

  }

  setLinkForMaps(hospital: any) {
    this.proccedurePrice = hospital.price;
    this.searchParam = `${hospital.hospital_name}, ${hospital.address.street_address}, ${hospital.address.city}, ${hospital.address.state} ${hospital.address.zipcode}`;
    this.searchParam = this.searchParam.replace(/ /g, '+');
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?width=800&height=800&hl=en&q=${this.searchParam}&ie=UTF8&t=&z=15&iwloc=B&output=embed`
    );
  }

  createChart() {

    const data = {
      labels: this.chartlabels,
      datasets: [
        {
          label: 'Selfpay Rate',
          data: this.chartdata,
          backgroundColor: ['#e74a4a'],
          borderColor: ['#e74a4a'],
          borderWidth: 1,
        },
      ],
    };


    this.priceBarGraph = new Chart('priceBarGraph', {
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        plugins: {
          datalabels: {
            color: 'white',
          },
          legend:{
            display: true
          }
        },
      },
      type: 'bar' as ChartType,
      data,
    });
  }

  setChartData() {
    for (let i = 0; i < this.selectedHospital.length; i++) {
      this.chartdata.push(this.selectedHospital[i].price);
    }
    for (let i = 0; i < this.selectedHospital.length; i++) {
      this.chartlabels.push(this.selectedHospital[i].hospital_name);
    }
    console.log('chart', this.chartdata, this.chartlabels)
  }
  ngOnDestroy(): void {
    if (this.priceBarGraph){
      this.priceBarGraph.destroy();
    }

  }

}
