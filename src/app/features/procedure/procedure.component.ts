import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-procedure',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './procedure.component.html',
  styleUrl: './procedure.component.scss'
})
export class ProcedureComponent implements OnInit {
  isLoading: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
  }
}
