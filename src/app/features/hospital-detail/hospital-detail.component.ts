import { Component, Input } from '@angular/core';
import { Hospital } from '../../shared/model/hospital';
import { HospitalService } from '../../core/services/hospital.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-hospital-detail',
  standalone: true,
  imports: [],
  templateUrl: './hospital-detail.component.html',
  styleUrl: './hospital-detail.component.scss',
})
export class HospitalDetailComponent {
  hospital: any = [];
  searchParam: string = '';
  sanitizedUrl: SafeResourceUrl = '';
  constructor(
    private hospitalService: HospitalService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.hospitalService.selectedHospital$.subscribe((hospital) => {
      this.hospital = hospital;
      this.setLinkForMaps();
    });
  }

  setLinkForMaps() {
    this.searchParam = `${this.hospital.hospital_name}, ${this.hospital.address.street_address}, ${this.hospital.address.city}, ${this.hospital.address.state} ${this.hospital.address.zipcode}`;
    this.searchParam = this.searchParam.replace(/ /g, '+');
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?width=800&height=800&hl=en&q=${this.searchParam}&ie=UTF8&t=&z=15&iwloc=B&output=embed`
    );
  }
}
