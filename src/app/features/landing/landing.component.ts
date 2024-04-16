import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ProcedureService } from '../../core/services/procedure.service';
import { FormsModule, NgForm } from '@angular/forms';



@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  constructor(private procedureService: ProcedureService, private router: Router) {}


  onFormSubmit(form: NgForm) {
    const formValue = form.value;
    formValue.name = formValue.name.trim().toUpperCase();
    this.procedureService.getProcedures(formValue).subscribe({
      next: (response: any) => {
        this.procedureService.procedureSearchResult(response)
        this.router.navigate(['/procedures-list']);
      },
      error: (error: any) => {
        console.error('Error occurred:', error);
        this.router.navigate(['/procedures-list']);
      }
    })
  }
}
