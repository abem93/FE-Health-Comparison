import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HospitalService } from '../../core/services/hospital.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import {  FormsModule, NgForm } from '@angular/forms';
import {  IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CommonModule } from '@angular/common';



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
  dropdownList:{ item_id: number, item_text: string }[] = [];
  selectedItems: { item_id: number, item_text: string }[] = [];
  dropdownSettings: IDropdownSettings = {};


  constructor(private router: Router, private hospitalService: HospitalService ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.loadHospitals()
    console.log(this.dropdownList)
    this.dropdownSettings  = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      limitSelection: 3,
      allowSearchFilter: false
    };
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
  }

  loadHospitals(){
    this.hospitalService.getHospitals().subscribe({
      next: (response: any) => {
        this.hospitals = response
        for(let hospital of this.hospitals){
          this.dropdownList.push({item_id: hospital.id, item_text: `${hospital.hospital_name} (${hospital.address.city}, ${hospital.address.state})`})
        }
      }
    })
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
