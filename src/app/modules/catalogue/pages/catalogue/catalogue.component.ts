import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TypeRead } from 'src/app/core/models/configuration-types/type-read';
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

  optionSelected: TypeRead;
  //options: StatusOption[] =  DictStatus;
  //optionSelected: 'Todos'
  options: TypeRead[];

  garments: GarmentMin[];

  private _toogleFilterSub: Subscription;
  private _garmentsSub: Subscription;

  constructor(
    private garmentService: GarmentsService,
    private docEventsService: DocumentEventsService,
    private configurationTypesService: ConfigurationTypesService,
  ) { }

  ngOnInit(): void {
    this.options = this.configurationTypesService.categoryTypes;
    this.optionSelected = this.options[this.options.length - 1];
    this.getAllGarments(true);
    this.debounceSearch();

    this._toogleFilterSub = this.docEventsService.documentClickedTarget.subscribe(
      target => this.documentClickListener(target)
    );
  }

  private getAllGarments(firstLoad?: boolean): void {
    this.firstLoad = firstLoad ?? false;
    this.isLoading = true;
    const cleanSearchBy = this.searchBy?.trim().toLowerCase();

    this._garmentsSub = this.garmentService.getAllByQuery(cleanSearchBy, this.optionSelected.value).subscribe(
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
          let cleanString: string = null;
          if(this.searchBy != null) cleanString = this.searchBy.trim().toLowerCase();
          this.getAllGarments(false);
        }
      );
  }

  handleFilterOptions(): void {
    this.showOptions = !this.showOptions;
  }

  selectFilterStatus(categorie: TypeRead): void {
    this.showOptions = false;
    this.optionSelected = categorie;
    this.getAllGarments(false);
  }

  ngOnDestroy(): void {
    this._toogleFilterSub.unsubscribe();
    this._garmentsSub.unsubscribe();
  }
}
