import { Hospital } from "./hospital";
import { Insurance } from "./insurance";
import { Procedure } from "./procedure";

export class ProcedureCost {
  id: number;
  procedure: Procedure;
  hospital: Hospital;
  total_price: number;
  insurance: Insurance;


  constructor(procedureCost:any){
    this.id = procedureCost.id || 0;
    this.procedure = procedureCost.procedure || new Procedure({});
    this.hospital = procedureCost.hospital || new Hospital({});
    this.total_price = procedureCost.total_price || 0;
    this.insurance = procedureCost.insurance || new Insurance({});
  }
}

