export class Address {
  street_address: string;
  line2?: string;
  city: string;
  state: string;
  zipcode: string;


  constructor(address:any){
    this.street_address = address.street_address || '';
    this.line2 = address.line2 || '';
    this.city = address.city || '';
    this.state = address.state || '';
    this.zipcode = address.zipcode || '';
  }
}
