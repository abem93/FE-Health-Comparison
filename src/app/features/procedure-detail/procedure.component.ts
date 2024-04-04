import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { MapComponent } from '../../shared/components/map/map.component';


@Component({
  selector: 'app-procedure',
  standalone: true,
  imports: [SpinnerComponent, MapComponent],
  templateUrl: './procedure.component.html',
  styleUrl: './procedure.component.scss',
})
export class ProcedureComponent implements OnInit {
  isLoading: boolean = true;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
