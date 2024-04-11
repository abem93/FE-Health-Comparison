import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements OnInit {
  lat: number = 37.157;
  lng: number = -93.284;
  constructor() { }

  ngOnInit(): void {
  }
}
