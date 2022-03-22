import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { TypeRead } from 'src/app/core/models/configuration-types/type-read';
import { GarmentMin } from 'src/app/core/models/garments/garment-min';
import { OptionCheck } from 'src/app/core/models/generics/option-check';
import { ConfigurationTypesService } from 'src/app/core/services/configuration-types.service';
import { GarmentsService } from 'src/app/core/services/garments.service';
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
  canLoadMore: boolean = true;
  isLoadingMore: boolean;
  messageAlert: string;
  typeAlert: string;
  showAlert: boolean = false;

  searchBy: string;
  showOptions: boolean = false;

  optionSelected: TypeRead;
  options: TypeRead[];
  categoriesSelected: number[];
  occasionsSelected: number[];
  availabilitiesSelected: boolean[];

  categories: OptionCheck[];
  occasions: OptionCheck[];

  garments: GarmentMin[]
  pageNumber: number = 1;
  pageSize: number = 10;
  maxPage: number;

  private _toogleFilterSub: Subscription;
  private _garmentsSub: Subscription;
  private _scrollSub: Subscription
  
  @ViewChild('garmentsCard', {read: ElementRef, static: true})
  garmentsCard: ElementRef;

  constructor(
    private garmentService: GarmentsService,
    private docEventsService: DocumentEventsService,
    private configurationTypesService: ConfigurationTypesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.garments = [];
    this.options = Array.from<TypeRead>(this.configurationTypesService.categoryTypes);
    this.options.push({key: 'todos', value: null, description: 'Todos'});

    //this.categories = Array.from<TypeRead>(this.configurationTypesService.categoryTypes);
    //this.categories.push({key: 'todos', value: null, description: 'Todos'});

    //this.occasions = Array.from<TypeRead>(this.configurationTypesService.occasionTypes);
    //this.categories.push({key: 'todos', value: null, description: 'Todos'});

    this.buildOptions();

    this.optionSelected = this.options[this.options.length - 1];

    this.categoriesSelected = [];
    this.occasionsSelected = [];

    this.getAllGarments(true);
    this.debounceSearch();
    this.loadGarmentsOnScroll();

    this._toogleFilterSub = this.docEventsService.documentClickedTarget.subscribe(
      target => this.documentClickListener(target)
    );
  }

  private buildOptions() {
    const categories = Array.from<TypeRead>(this.configurationTypesService.categoryTypes);
    this.categories = categories.map(e => {
      return {
        ...e,
        checked: false,
      } as OptionCheck
    });

    const occasions = Array.from<TypeRead>(this.configurationTypesService.occasionTypes);
    this.occasions = occasions.map(e => {
      return {
        ...e,
        checked: false,
      } as OptionCheck
    });
  }

  private getAllGarments(firstLoad?: boolean): void {
    this.firstLoad = firstLoad ?? false;
    this.isLoading = true;
    const cleanSearchBy = this.searchBy?.trim().toLowerCase();

    this._garmentsSub = this.garmentService.getAllByQuery(
      this.pageNumber, 
      this.pageSize, 
      this.categoriesSelected,
      this.occasionsSelected,
      cleanSearchBy, 
      this.optionSelected.value
      ).subscribe(
      (res) => {
        this.maxPage = res.maxPage;
        //this.garments.push(...res.items)
        if(this.pageNumber == 1)
          this.garments = res.items;
        else
          this.garments.push(...res.items);
        this.firstLoad = false;
        this.isLoading = false;
        this.canLoadMore = true;
        this.isLoadingMore = false;
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
          this.getAllGarments(false);
        }
      );
  }

  private loadGarmentsOnScroll() {
    this._scrollSub = fromEvent(document, 'scroll')
      .pipe(
        map((e) => {
          if(this.pageNumber < this.maxPage) this.isLoadingMore = true; 
          return e;
        }),
        debounceTime(300),
      )
      .subscribe(
        (event: any) => {
          if(this.pageNumber == this.maxPage) return;

          const children = event.target.children[0];
          const scrollTop = children.scrollTop;
          const scrollHeight = children.scrollHeight;
          const clientHeight = children.clientHeight;

          if(scrollTop + clientHeight >= scrollHeight - 5 && this.canLoadMore == true) {
            this.canLoadMore = false;
            this.pageNumber++;
            this.getAllGarments(false);
          } 
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

  navigateToCreate(): void {
    this.router.navigate(['/catalogue/create'], {relativeTo: this.route});
  }

  applyFilters(): void {
    this.categoriesSelected = this.categories.filter(e => e.checked).map(e => e.value);
    this.occasionsSelected = this.occasions.filter(e => e.checked).map(e => e.value);
    this.pageNumber = 1;
    this.getAllGarments(false);
  }

  clearFilters(): void {
    this.categoriesSelected = [];
    this.occasionsSelected = [];
    this.categories.forEach(e => e.checked = false);
    this.occasions.forEach(e => e.checked = false);
    this.pageNumber = 1;
    this.getAllGarments(false);
  }

  ngOnDestroy(): void {
    this._toogleFilterSub.unsubscribe();
    this._garmentsSub.unsubscribe();
    this._scrollSub.unsubscribe();
  }
}
