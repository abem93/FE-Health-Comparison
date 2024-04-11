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
      defaultOpen: true
    };
  }

  onFormSubmit(form: NgForm) {
    console.log(form.value)
    this.selectHospital(form);
    this.selectProcedure(form);

    // this.router.navigate(['/procedure/', form.value.procedure]);

    this.router.navigate(['/procedure']);
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
      console.log(this.procedures)
    });
  }
  selectHospital(form: NgForm){
    //compare and grab selected hospitals information
    const selectedHospitals = []
    for(let selectedHospital of form.value.hospitals){
      for(let hospital of this.hospitals){
        if(selectedHospital.id === hospital.id){
          selectedHospitals.push(hospital);
      }
      }
    }
    //Push selected hospitals to behavior subject
    this.hospitalService.selectMultipleHospitals([...selectedHospitals]);
  }

  selectProcedure(form: NgForm){
    //compare and grab selected hospitals information
    const selectedProcedure = parseInt(form.value.procedure)
      for(let procedure of this.procedures){
        if(selectedProcedure === procedure.id){
          console.log(procedure, selectedProcedure)
          //Push selected hospitals to behavior subject


      }
      }
    }

}



