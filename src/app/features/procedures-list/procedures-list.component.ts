import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-procedures-list',
  standalone: true,
  imports: [],
  templateUrl: './procedures-list.component.html',
  styleUrl: './procedures-list.component.scss'
})
export class ProceduresListComponent implements OnInit {
  procedures: any[] = [];


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadProcedure()
  }

  loadProcedure(){
    if(this.procedures.length < 2){
      this.router.navigate(['/procedure']);
    }
  }
}
