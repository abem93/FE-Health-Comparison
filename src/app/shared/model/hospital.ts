import { Address } from "./address";

export class Hospital {
  id: number;
  hospital_name: string;
  address: Address;

  constructor(hospital:any){
    this.id = hospital.id || 0
    this.hospital_name = hospital.hospital_name || '';
    this.address = hospital.address || new Address({});
  }
}
