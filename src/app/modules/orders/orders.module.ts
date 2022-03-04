import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './pages/orders/orders.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { BasicBodyParamsComponent } from './components/basic-body-params/basic-body-params.component';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailsComponent,
    BasicBodyParamsComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class OrdersModule { }
