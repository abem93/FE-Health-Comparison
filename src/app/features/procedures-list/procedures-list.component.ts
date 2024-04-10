import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HospitalService } from '../../core/services/hospital.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import {  FormsModule, NgForm } from '@angular/forms';
import {  IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CommonModule } from '@angular/common';
import { ProcedureService } from '../../core/services/procedure.service';



@Component({
  selector: 'app-procedures-list',
  standalone: true,
  imports: [RouterModule, SpinnerComponent, NgMultiSelectDropDownModule, CommonModule, FormsModule],
  templateUrl: './procedures-list.component.html',
  styleUrl: './procedures-list.component.scss'
})
export class ProceduresListComponent implements OnInit {
  isLoading: boolean = true;
  procedures: any[] = [];
  hospitals: any[] = [];
  selectedProcedure: any;
  dropdownList:{ id: number, hospital_name: string }[] = [];
  selectedItems: { id: number, hospital_name: string }[] = [];
  dropdownSettings: IDropdownSettings = {};


  constructor(private router: Router, private hospitalService: HospitalService, private procedureService: ProcedureService ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.loadProcedures();
    this.loadHospitals();
    this.dropdownSettings  = {
      singleSelection: false,
      idField: 'id',
      textField: 'hospital_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      limitSelection: 3,
      allowSearchFilter: false,
      noDataAvailablePlaceholderText: 'No Hospitals available',
    };
  }

  onFormSubmit(form: NgForm) {
    console.log(form.value)
  }

  loadHospitals(){
    this.hospitalService.getHospitals().subscribe({
      next: (response: any) => {
        this.hospitals = response
        for(let hospital of this.hospitals){
          this.dropdownList.push({id: hospital.id, hospital_name: `${hospital.hospital_name} (${hospital.address.city}, ${hospital.address.state})`})
        }
      }
    })
  }

  loadProcedures(){
    this.procedureService.procedureSearchSubject$.subscribe((procedures) => {
      this.procedures = procedures;
    });
  }
}
