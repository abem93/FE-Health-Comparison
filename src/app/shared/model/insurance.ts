export class Insurance {
  id: number;
  name: string;
  price: number;


  constructor(insurance:any){
    this.id = insurance.id || 0
    this.name = insurance.name || '';
    this.price = insurance.price || 0;
  }
}
