import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TypeRead } from 'src/app/core/models/configuration-types/type-read';
import { FeatureGarmentUpdate } from 'src/app/core/models/garments/feature-garment-update';
import { FeatureGarmentWrite } from 'src/app/core/models/garments/feature-garment-write';
import { GarmentRead } from 'src/app/core/models/garments/garment-read';
import { GarmentUpdate } from 'src/app/core/models/garments/garment-update';
import { GarmentWrite } from 'src/app/core/models/garments/garment-write';
import { ConfigurationTypesService } from 'src/app/core/services/configuration-types.service';
import { GarmentsService } from 'src/app/core/services/garments.service';
import { CunstomValidators } from 'src/app/core/utils/custom.validator';
import { EnumFeatures, EnumFeaturesString } from 'src/app/core/utils/features.enum';
import { RGXP_NUMBER_PRICE } from 'src/app/core/utils/regex.constants';
import { DocumentEventsService } from 'src/app/shared/services/document-events.service';

@Component({
  selector: 'app-garment-details',
  templateUrl: './garment-details.component.html',
  styleUrls: ['./garment-details.component.scss']
})
export class GarmentDetailsComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  showZoomImage: boolean = false;
  showedit: boolean = false;
  showAlert: boolean;
  messageAlert: string;
  typeAlert: string;
  selectedCategory: TypeRead;

  showOccasionOpts: boolean = false;

  EFEATURES = EnumFeatures;
  EFEATURES_STRING = EnumFeaturesString;

  showFabricOpts: boolean = false;
  categories: TypeRead[];
  fabrics: TypeRead[];
  occasions: TypeRead[];


  selectedFabrics: TypeRead[] = [];
  selectedOccasions: TypeRead[] = [];
  selectedColors: string[] = [];

  isSaving: boolean = false;

  selectedImageToZoom: string;
  codeGarment: string;
  garmentDetail: GarmentRead;

  @ViewChild('fabricOptions', {read: ElementRef, static: false})
  fabricOptions: ElementRef;

  @ViewChild('occasionOptions', {read: ElementRef, static: false})
  occasionOptions: ElementRef;

  private _toogleOptionsSub: Subscription;
  garmentDataForm: FormGroup;
  newgarmentData: GarmentUpdate;

  private _selectedImage: string;
  private _garmentDetial$: Subscription;

  constructor(
    private configurationTypesService: ConfigurationTypesService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private garmentService: GarmentsService,
    private docEventsService: DocumentEventsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.categories = Array.from<TypeRead>(this.configurationTypesService.categoryTypes);
    this.fabrics = Array.from<TypeRead>(this.configurationTypesService.fabricTypes);
    this.occasions = Array.from<TypeRead>(this.configurationTypesService.occasionTypes);
    this.route.queryParams.subscribe(
      (params: any) => {
        this.codeGarment = params.codeGarment;
        this.getGarmentDetail();
        //this.buildGarmentDataForm();
      }
    );
    /*this._toogleOptionsSub = this.docEventsService.documentClickedTarget.subscribe(
      target => this.documentClickListener(target)
    );*/
  }

  private documentClickListener(target: any): void {
    const clickedInside = this.fabricOptions.nativeElement.contains(target);
    if(!clickedInside) this.showFabricOpts = false;

    const clickedInside2 = this.occasionOptions.nativeElement.contains(target);
    if(!clickedInside2) this.showOccasionOpts = false;
  }


  private buildGarmentDataForm(): void {
    this.garmentDataForm = this.formBuilder.group({
      codeGarment: [this.garmentDetail.codeGarment, Validators.required],
      nameGarment: [this.garmentDetail.nameGarment, [Validators.required, Validators.maxLength(100)]],
      firstRangePrice: [this.garmentDetail.firstRangePrice, [Validators.required, Validators.pattern(RGXP_NUMBER_PRICE), CunstomValidators.ValidateAmount()]],
      secondRangePrice: [this.garmentDetail.secondRangePrice, [Validators.required, Validators.pattern(RGXP_NUMBER_PRICE), CunstomValidators.ValidateAmount()]],
      description: [this.garmentDetail.description, Validators.maxLength(250)],
      category: [this.garmentDetail.categoryId, Validators.required],
      fabrics: [this.selectedFabrics, Validators.required],
      occasions: [this.selectedOccasions, Validators.required],
      colors: [this.selectedColors, Validators.required],
      available: [this.garmentDetail.available, Validators.required],
    });
  }


  isInvalid(controlName: string): boolean {
    const formControl = this.garmentDataForm.get(controlName);
    return formControl.errors && formControl.touched;
  }

  hasError(controlName: string, validator: string): boolean {
    const formControl = this.garmentDataForm.get(controlName);
    return formControl.errors?.[validator] && formControl.touched;
  }

  private getGarmentDetail() {


    this._garmentDetial$ = this.garmentService.getDetail(this.codeGarment).subscribe(
      res => {
        this.garmentDetail = res;
        for (let aux of res.colors){
          this.selectedColors.push(aux);
        }
        for (let aux1 of res.fabrics){
          const fabric = this.fabrics.find(e => e.description === aux1);
          this.selectedFabrics.push(fabric);
        }
        for (let aux2 of res.occasions){
          const occasion = this.occasions.find(e => e.description === aux2);
          this.selectedOccasions.push(occasion);
        }
        console.log(res);
        this.selectedCategory = this.categories.find(e => e.description === res.category);
        this._selectedImage = this.garmentDetail.images[0];

        this.buildGarmentDataForm()
      },
      err => {
        this.isLoading = true;
        this.messageAlert = err.message;
        this.typeAlert = 'error';
        this.showAlert = true;
      }
    );

  }

  removeSelectedItem(item: TypeRead, feature: number): void {
    this.showFabricOpts = false;

    switch(feature) {
      case this.EFEATURES.fabric:
        this.selectedFabrics = this.selectedFabrics.filter(e => e.key !== item.key);
        this.garmentDataForm.get('fabrics').setValue(this.selectedFabrics);
        break;
      case this.EFEATURES.occasion:
        this.selectedOccasions = this.selectedOccasions.filter(e => e.key !== item.key);
        this.garmentDataForm.get('occasions').setValue(this.selectedOccasions);
        break;
      default:
        break;
    }
  }

  selectItem(item: TypeRead, feature: number): void {
    let found: TypeRead;

    switch(feature) {
      case this.EFEATURES.fabric:
        this.garmentDataForm.get('fabrics').markAsTouched();
        found = this.selectedFabrics.find(e => e.key === item.key);
        if (found != null) {
          this.selectedFabrics = this.selectedFabrics.filter(e => e.key !== found.key);
        }
        else {
          this.selectedFabrics.push(item);
        }
        this.garmentDataForm.get('fabrics').setValue(this.selectedFabrics);
        break;
      case this.EFEATURES.occasion:
        this.garmentDataForm.get('occasions').markAsTouched();
        found = this.selectedOccasions.find(e => e.key === item.key);
        if (found != null) {
          this.selectedOccasions = this.selectedOccasions.filter(e => e.key !== found.key);
        }
        else {
          this.selectedOccasions.push(item);
        }
        this.garmentDataForm.get('occasions').setValue(this.selectedOccasions);
        break;
      default:
        break;
    }

  }

  changeColor($event: any) {
    this.garmentDataForm.get('colors').markAsTouched();
    this.selectedColors.push($event.target.value);
    this.garmentDataForm.get('colors').setValue(this.selectedColors);
  }

  getItemColor(item: string): string {
    if(item === '#ffffff') return `background-color: ${item}; border: solid 1px black;`
    else return 'background-color: ' + item;
  }

  removeSelectedColor(item: string) {
    this.selectedColors = this.selectedColors.filter(e => e !== item);
    this.garmentDataForm.get('colors').setValue(this.selectedColors);
  }

  get selectedImage() {
    return this._selectedImage;
  }

  selectImageToView(value: string) {
    this._selectedImage = value;
  }

  colorGarment(color: string): string {
    if(color === '#ffffff') return `background-color: ${color}; border: solid 1px black;`
    return 'background-color: ' + color;
  }

  colorAvailable(available: boolean): string {
    return available
      ? 'background-color: var(--color-triadic-A-700);'
      : 'background-color: #ef4444';
  }

  buildGarmentData(): void {


    const {
      codeGarment,
      nameGarment,
      firstRangePrice,
      secondRangePrice,
      description,
      category,
      fabrics,
      occasions,
      colors,
      available
    } = this.garmentDataForm.value;

    this.newgarmentData = {
      codeGarment,
      nameGarment,
      firstRangePrice,
      secondRangePrice,
      description,
      category: Number(category),
      available: Boolean(available),
      atelierId: 0,
      features: [],
      images: [],
      patterns: [],
    }

    console.log(fabrics);

    const fabricFeatures: FeatureGarmentUpdate[] = fabrics.map((e:TypeRead) => {
      return {
        key: e.key,
        value: e.description,
        typeFeature: this.EFEATURES_STRING.fabric,
        typeFeatureValue: e.value,
      } as FeatureGarmentUpdate;
    });

    const occasionFeatures: FeatureGarmentUpdate[] = occasions.map((e:TypeRead) => {
      return {
        value: e.description,
        typeFeature: this.EFEATURES_STRING.occasion,
        typeFeatureValue: e.value,
      } as FeatureGarmentUpdate;
    });

    const colorFeatures: FeatureGarmentUpdate[] = colors.map((e:string) => {
      return {
        value: e,
        typeFeature: this.EFEATURES_STRING.color,
        typeFeatureValue: this.EFEATURES.color,
      } as FeatureGarmentUpdate;
    });


    this.newgarmentData.features.push(
      ...fabricFeatures,
      ...occasionFeatures,
      ...colorFeatures
    );

    console.log(this.newgarmentData);
    this.isSaving = true;
    this.garmentService.update(this.newgarmentData).subscribe(
      res => {
        this.messageAlert = 'Prenda agregada al catálogo con éxito';
        this.typeAlert = 'success';
        this.showAlert = true;
        this.isSaving = false;
        this.getGarmentDetail();
        this.showedit = false;
      },
      err => {
        this.messageAlert = err.message;
        this.typeAlert = 'error';
        this.showAlert = true;
        this.isSaving = false;
        this.showedit = false;
      }
    );

  }

  borderImagePreview(image: string): boolean {
    if(image === this._selectedImage) return true;
    return false;
  }

  zoomSelectedImage(img: string) {
    this.showZoomImage = true;
    this.selectedImageToZoom = img;
  }

  closeZoom() {
    this.showZoomImage = false;
    this.selectedImageToZoom = '';
  }

  navigateToBack(): void {
    this.location.back();
  }

  showEditMode(): void {
    this.showedit = !this.showedit;
    this._toogleOptionsSub = this.docEventsService.documentClickedTarget.subscribe(
      target => this.documentClickListener(target)
    );

  }

  ngOnDestroy(): void {
    this._garmentDetial$.unsubscribe();
  }

}
