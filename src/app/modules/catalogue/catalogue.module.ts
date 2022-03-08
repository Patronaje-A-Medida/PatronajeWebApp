import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CatalogueComponent
  ],
  imports: [
    CommonModule,
    CatalogueRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CatalogueModule { }
