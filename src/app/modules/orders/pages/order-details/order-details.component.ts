import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Measurements } from 'src/app/core/models/measurements/measurements';
import { OrderDetailRead } from 'src/app/core/models/orders/order-detail-read';
import { MeasurementsService } from 'src/app/core/services/measurements.service';
import { OrdersService } from 'src/app/core/services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  showAlert: boolean;
  messageAlert: string;
  typeAlert: string;

  codeOrder: string;
  codeGarment: string;

  orderDetail: OrderDetailRead;
  measurements: Measurements[];

  private _orderDetail$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private measurementService: MeasurementsService,
  ) { }
  

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params: any) => {
        this.codeOrder = params.codeOrder;
        this.codeGarment = params.codeGarment;
        this.getOrderDetail();
        this.getBodyMeasurements();
      }
    );
  }

  private getOrderDetail(): void {
    this._orderDetail$ = this.ordersService.getDetail(this.codeOrder, this.codeGarment).subscribe(
      res => this.orderDetail = res,
      err => {
        this.isLoading = true;
        this.messageAlert = err.message;
        this.typeAlert = 'error';
        this.showAlert = true;
      }
    );
  }

  private getBodyMeasurements(): void {
    this.measurementService.getLastMeasurements(3).subscribe(
      res => this.measurements = res.measurements,
    );
  }

  garmentColor(color: string): string {
    if (color.toUpperCase() === '#FFFFFF') return `background-color: ${color}; border: solid 1px black`;
    return `background-color: ${color};`;
  }

  get basicDimensions(): number[] {
    let values = this.measurements.map(e => e.value);
    return [values[0], values[1], values[2], values[4]];
  }

  navigateToBack() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  navigateToPattern(): void {
    this.router.navigate(['/orders/details/pattern'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this._orderDetail$.unsubscribe();
  }
}
