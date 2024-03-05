export class User {
  id: number;
  email: string;

  constructor(user:any){
    this.id = user.id || 0
    this.email = user.email || '';
  }
}
