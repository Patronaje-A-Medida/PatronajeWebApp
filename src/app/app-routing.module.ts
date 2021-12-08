import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from './pages/orders/orders.component';
import {OrderDetailsComponent} from './pages/order-details/order-details.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: LandingComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'orders/:id', component: OrderDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
