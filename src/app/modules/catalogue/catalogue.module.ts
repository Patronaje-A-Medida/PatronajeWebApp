import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GarmentCardComponent } from './components/garment-card/garment-card.component';
import { GarmentDetailsComponent } from './pages/garment-details/garment-details.component';
import { GarmentCreateComponent } from './pages/garment-create/garment-create.component';


@NgModule({
  declarations: [
    CatalogueComponent,
    GarmentCardComponent,
    GarmentDetailsComponent,
    GarmentCreateComponent,
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CatalogueModule { }
