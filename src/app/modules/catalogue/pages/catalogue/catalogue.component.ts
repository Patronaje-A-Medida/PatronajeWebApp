import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GarmentMin } from 'src/app/core/models/garments/garment-min';
import { StatusOption } from 'src/app/core/models/generics/status-option';
import { ConfigurationTypesService } from 'src/app/core/services/configuration-types.service';
import { GarmentsService } from 'src/app/core/services/garments.service';
import { DictStatus } from 'src/app/core/utils/status.dictionary';
import { DocumentEventsService } from 'src/app/shared/services/document-events.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, OnDestroy {

  @ViewChild('inputSearchBy', {read: ElementRef, static: true}) 
  inputSearchBy: ElementRef;

  @ViewChild('containerFilterCategory', {read: ElementRef, static: false})
  containerFilterCategory: ElementRef;

  firstLoad: boolean = false;
  isLoading: boolean;
  messageAlert: string;
  typeAlert: string;
  showAlert: boolean = false;

  searchBy: string;
  showOptions: boolean = false;

  optionSelected: StatusOption = {key: 'Todos', value: null};
  options: StatusOption[] =  DictStatus;
  //optionSelected: 'Todos'
  opts: string[];

  garments: GarmentMin[];

  private _toogleFilterSub: Subscription;
  private _garmentsSub: Subscription;

  constructor(
    private garmentService: GarmentsService,
    private docEventsService: DocumentEventsService,
    private configurationTypesService: ConfigurationTypesService,
  ) { }

  ngOnInit(): void {
    this.opts = this.configurationTypesService.categoryTypes;
    this.opts.push('mamarre mamarre');
    this.getAllGarments(true);
    this.debounceSearch();

    this._toogleFilterSub = this.docEventsService.documentClickedTarget.subscribe(
      target => this.documentClickListener(target)
    );
  }

  private getAllGarments(firstLoad?: boolean, searchBy?: string): void {
    this.firstLoad = firstLoad ?? false;
    this.isLoading = true;

    //let cleanSearchBy: string;
    let cleanFilterCategory: string;

    //if(this.searchBy != null) cleanSearchBy = this.searchBy.trim().toLowerCase();
    if(this.optionSelected.value != null) cleanFilterCategory = this.optionSelected.value.toString();

    this._garmentsSub = this.garmentService.getAllByQuery(searchBy, cleanFilterCategory).subscribe(
      (res) => {
        this.garments = res;
        this.firstLoad = false;
        this.isLoading = false;
      },
      (err) => {
        this.messageAlert = err.message;
        this.typeAlert = 'error';
        this.showAlert = true;
      }
    );
  }

  private documentClickListener(target: any): void {
    const clickedInside = this.containerFilterCategory.nativeElement.contains(target);
    if(!clickedInside) this.showOptions = false;
  }

  private debounceSearch(): void {
    fromEvent(this.inputSearchBy.nativeElement, 'keyup')
      .pipe(debounceTime(800))
      .subscribe(
        () => {
          const cleanString = this.searchBy.trim().toLowerCase();
          this.getAllGarments(false, cleanString);
        }
      );
  }

  handleFilterOptions(): void {
    this.showOptions = !this.showOptions;
  }

  selectFilterStatus(status: StatusOption): void {
    this.showOptions = false;
    this.optionSelected = status;
    //this.getAllOrders();
  }

  ngOnDestroy(): void {
    this._toogleFilterSub.unsubscribe();
    this._garmentsSub.unsubscribe();
  }
}
