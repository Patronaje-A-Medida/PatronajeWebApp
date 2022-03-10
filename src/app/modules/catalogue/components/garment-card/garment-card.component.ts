import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GarmentMin } from 'src/app/core/models/garments/garment-min';

@Component({
  selector: 'app-garment-card',
  templateUrl: './garment-card.component.html',
  styleUrls: ['./garment-card.component.scss']
})
export class GarmentCardComponent implements OnInit {

  @Input('garment') garment: GarmentMin;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  navigateToDetails(): void {
    this.router.navigate(
      ['/catalogue/details'],
      {
        relativeTo: this.route,
        queryParams: {
          codeGarment: this.garment.codeGarment,
        }
      }
    );
  }

}
