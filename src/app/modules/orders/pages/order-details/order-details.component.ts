import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { OrderDetailRead } from 'src/app/core/models/orders/order-detail-read';
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

  private _orderDetail$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService
  ) { }
  

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params: any) => {
        this.codeOrder = params.codeOrder;
        this.codeGarment = params.codeGarment;
        this.getOrderDetail();
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

  garmentColor(color: string): string {
    if (color.toUpperCase() === '#FFFFFF') return `background-color: ${color}; border: solid 1px black`;
    return `background-color: ${color};`;
  }

  get basicDimensions(): number[] {
    return [175, 80, 70, 75];
  }

  navigateToBack() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this._orderDetail$.unsubscribe();
  }
}
