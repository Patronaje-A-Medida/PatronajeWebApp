import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { GarmentCardComponent } from './components/garment-card/garment-card.component';
import { GarmentDetailsComponent } from './pages/garment-details/garment-details.component';


@NgModule({
  declarations: [
    CatalogueComponent,
    GarmentCardComponent,
    GarmentDetailsComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CatalogueModule { }
