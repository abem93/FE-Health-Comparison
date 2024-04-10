export class Procedure {
  id: number;
  name: string;
  cpt_code: string;


  constructor(procedure:any){
    this.id = procedure.id || 0
    this.name = procedure.name || '';
    this.cpt_code = procedure.cpt_code || '';
  }
}
