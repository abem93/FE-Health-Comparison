import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { map } from 'rxjs';



@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})

export class MapComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 37.157, lng: -93.284 };
  zoom = 18;
  markers = [
    {lat: 37.142200, lng: -93.282500},
  ];
  private geocodingApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const address = '3801 S National Ave, Springfield, MO 65807';
    this.getLatLng(address);
    this.markers.push(this.center);

  }

  getLatLng(address: string) {
    const url = `${this.geocodingApiUrl}?address=${encodeURIComponent(address)}&key=AIzaSyDmHpwG2ERMuTFCx_x0bkrRgW7SB6NCK6o`;
    this.http.get(url).pipe(
      map((response: any) => {
        if (response.status === 'OK') {
          return {
            lat: response.results[0].geometry.location.lat,
            lng: response.results[0].geometry.location.lng
          };
        } else {
          throw new Error('Geocoding failed');
        }
      })
    ).subscribe(center => {
      this.center = center;
      this.markers.push(center);
    });
  }
}
