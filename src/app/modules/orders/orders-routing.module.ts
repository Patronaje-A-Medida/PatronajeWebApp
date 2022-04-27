import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { OrderPatternComponent } from './pages/order-pattern/order-pattern.component';
import { OrdersComponent } from './pages/orders/orders.component';

const routes: Routes = [
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders/details', component: OrderDetailsComponent },
  { path: 'orders/details/pattern', component: OrderPatternComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
