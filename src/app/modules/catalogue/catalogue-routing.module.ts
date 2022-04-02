import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { GarmentCreateComponent } from './pages/garment-create/garment-create.component';
import { GarmentDetailsComponent } from './pages/garment-details/garment-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/catalogue', pathMatch: 'full' },
  { path: 'catalogue', component: CatalogueComponent},
  { path: 'catalogue/details', component: GarmentDetailsComponent },
  { path: 'catalogue/create', component: GarmentCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
