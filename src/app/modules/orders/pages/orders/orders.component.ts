import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TypeRead } from 'src/app/core/models/configuration-types/type-read';
import { PagedResponse } from 'src/app/core/models/generics/paged-response';
import { StatusOption } from 'src/app/core/models/generics/status-option';
import { OrderDetailMin } from 'src/app/core/models/orders/order-detail-min';
import { OrderRead } from 'src/app/core/models/orders/order-read';
import { ConfigurationTypesService } from 'src/app/core/services/configuration-types.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { DocumentEventsService } from 'src/app/shared/services/document-events.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  @ViewChild('inputSearchBy', {read: ElementRef, static: true}) 
  inputSearchBy: ElementRef;

  @ViewChild('containerFilterStatus', {read: ElementRef, static: false})
  containerFilterStatus: ElementRef;
  
  firstLoad: boolean;
  isLoading: boolean;
  messageAlert: string;
  typeAlert: string;
  showAlert: boolean = false;

  searchBy: string;
  showOptions: boolean = false;
  optionSelected: TypeRead;
  options: TypeRead[];

  orders: PagedResponse<OrderRead>;
  pageNumber: number = 1;
  pageSize: number = 5;
  fromItem: number;
  toItem: number;

  private _toogleFilterSub: Subscription;
  private _ordersSub: Subscription;

  constructor(
    private orderService: OrdersService,
    private docEventsService: DocumentEventsService,
    private configurationTypesService: ConfigurationTypesService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
  }
  
  ngOnInit(): void {
    this.options = this.configurationTypesService.orderStatusTypes;
    this.optionSelected = this.options[this.options.length - 1];
    this.getAllOrders(true);
    this.debounceSearch();

   this._toogleFilterSub = this.docEventsService.documentClickedTarget.subscribe(
      target => this.documentClickListener(target)
    );

  }

  private getAllOrders(firstLoad?: boolean): void {
    this.firstLoad = firstLoad ?? false;
    this.isLoading = true;
    const cleanSearchBy = this.searchBy?.trim().toLowerCase();
    
    this._ordersSub = this.orderService.getAllByQuery(this.pageNumber, this.pageSize, cleanSearchBy, this.optionSelected.value).subscribe(
      (res) => {
        this.orders = res;
        this.firstLoad = false;
        this.isLoading = false;
        this.computeItems();
      },
      (err) => {
        this.messageAlert = err.message;
        this.typeAlert = 'error';
        this.showAlert = true;
      }
    );

  }

  private documentClickListener(target: any): void {
    const clickedInside = this.containerFilterStatus.nativeElement.contains(target);
    if (!clickedInside) this.showOptions = false;
  }

  showDetails(order: OrderRead): void {
    order.showDetails = !order.showDetails;
  }

  garmentColor(color: string): string {
    return `background-color: ${color};`;
  }

  debounceSearch(): void {
    fromEvent(this.inputSearchBy.nativeElement, 'keyup')
    .pipe(debounceTime(800))
    .subscribe(
      () => {
        this.getAllOrders();
      }
    );
  }

  selectFilterStatus(status: TypeRead): void {
    this.showOptions = false;
    this.optionSelected = status;
    this.getAllOrders();
  }

  handleFilterOptions(): void {
    this.showOptions = !this.showOptions;
  }

  navigateToDetails(order: OrderRead, detail: OrderDetailMin ) {
    this.router.navigate(['/orders/details'], {
      relativeTo: this.route, 
      queryParams: {
        codeOrder: order.codeOrder,
        codeGarment: detail.codeGarment,
      }
    });
  }

  nextPage() {
    if(this.pageNumber != this.orders.maxPage) {
      this.pageNumber++;
      this.getAllOrders();
    }
  }

  previousPage() {
    if(this.pageNumber > 1) {
      this.pageNumber--;
      this.getAllOrders();
    }
  }

  private computeItems() {
    this.fromItem = (this.orders.itemsPerPage * this.orders.pageNumber) - (this.orders.itemsPerPage - 1);
    this.toItem = this.fromItem + this.orders.items.length - 1;
  }

  ngOnDestroy(): void {
    this._toogleFilterSub.unsubscribe();
    this._ordersSub.unsubscribe();
  }

}
