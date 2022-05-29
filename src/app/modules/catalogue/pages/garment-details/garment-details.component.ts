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
import { GarmentUpdateFile } from 'src/app/core/models/garments/garment-update-file';
import { GarmentUpdateImages } from 'src/app/core/models/garments/garment-update-images';
import { ImageUtil } from 'src/app/core/utils/images.util';
import { PatternGarmentMin } from 'src/app/core/models/pattern-garments/pattern-garment-min';

@Component({
  selector: 'app-garment-details',
  templateUrl: './garment-details.component.html',
  styleUrls: ['./garment-details.component.scss']
})
export class GarmentDetailsComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  showZoomImage: boolean = false;
  showedit: boolean = false;
  editModeImages: boolean = false;
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
  uploadImageFiles: GarmentUpdateFile[] = [];
  uploadPatterns: any[] = [];
  uploadPatternFiles: GarmentUpdateFile[] = [];

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
      }
    );
    this._toogleOptionsSub = this.docEventsService.documentClickedTarget.subscribe(
      target => this.documentClickListener(target)
    );
  }

  private documentClickListener(target: any): void {

    if(this.fabricOptions === undefined || this.occasionOptions === undefined) return;

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

  private getGarmentDetail() {
    this._garmentDetial$ = this.garmentService.getDetail(this.codeGarment).subscribe(
      res => {
        this.garmentDetail = res;
        this.setGarmentFeatures(this.garmentDetail);
        this.selectedCategory = this.categories.find(e => e.description === res.category);
        this._selectedImage = this.garmentDetail.images[0].value;
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

  private resetForm(): void {
    this.garmentDataForm.reset();
    /*this.selectedFabrics = [];
    this.selectedOccasions = [];
    this.selectedColors = [];
    this.categories = Array.from<TypeRead>(this.configurationTypesService.categoryTypes);*/
    this.setGarmentFeatures(this.garmentDetail);
    this.buildGarmentDataForm();
  }

  private setGarmentFeatures(grmt: GarmentRead): void {
    this.selectedFabrics = [];
    this.selectedOccasions = [];
    this.selectedColors = [];
    this.categories = Array.from<TypeRead>(this.configurationTypesService.categoryTypes);

    for (let aux of grmt.colors){
      this.selectedColors.push(aux);
    }
    for (let aux1 of grmt.fabrics){
      const fabric = this.fabrics.find(e => e.description === aux1);
      this.selectedFabrics.push(fabric);
    }
    for (let aux2 of grmt.occasions){
      const occasion = this.occasions.find(e => e.description === aux2);
      this.selectedOccasions.push(occasion);
    }
  }

  isInvalid(controlName: string): boolean {
    const formControl = this.garmentDataForm.get(controlName);
    return formControl.errors && formControl.touched;
  }

  hasError(controlName: string, validator: string): boolean {
    const formControl = this.garmentDataForm.get(controlName);
    return formControl.errors?.[validator] && formControl.touched;
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

    if(this.garmentDataForm.invalid) return;

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
      id: this.garmentDetail.id,
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

    this.isSaving = true;

    console.log(this.newgarmentData);

    this.garmentService.update(this.newgarmentData).subscribe(
      _ => {
        this.messageAlert = 'Prenda actualizada con éxito';
        this.typeAlert = 'success';
        this.showAlert = true;
        this.isSaving = false;
        this.getGarmentDetail();
        this._toogleOptionsSub.unsubscribe();
        this.showedit = false;
      },
      err => {
        this.messageAlert = err.message;
        this.typeAlert = 'error';
        this.showAlert = true;
        this.isSaving = false;
        this.hideEditMode();
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
    this.showedit = true;
    this._toogleOptionsSub = this.docEventsService.documentClickedTarget.subscribe(
      target => this.documentClickListener(target)
    );
  }

  showEditModeImages(): void {
    this.editModeImages = true;
    this.uploadImageFiles = [];
    this.uploadPatterns = [];
    this.uploadPatternFiles = []
    this.uploadImageFiles = this.garmentDetail.images.map(e => {
      return {
        id: e.id,
        image: e.value,
        fileName: '',
        folderPath: 'garments',
      } as GarmentUpdateFile
    });
    this.uploadPatternFiles = this.garmentDetail.patterns.map(e => {
      return {
        id: e.id,
        image: e.imagePattern,
        fileName: '',
        folderPath: 'patterns',
      } as GarmentUpdateFile
    });
    this.uploadPatterns = this.garmentDetail.patterns.map(e => e.imagePattern);
  }

  hideEditMode(): void {
    this.showedit = false;
    this.resetForm();
    this._toogleOptionsSub.unsubscribe();
  }

  hideEditModeImages(): void {
    this.editModeImages = false;
  }

  fileSelected($event: any, feature: number): void {
    let files: File[] = [];
    files.push(...$event.target.files);

    if(files.filter(e => !e.type.match('image/*')).length > 0) {
      this.messageAlert = 'Los archivos que no son imágenes serán descartados';
      this.typeAlert = 'warning',
      this.showAlert = true;
    }

    const filterFiles = files.filter(e => e.type.match('image/*'));
    if(filterFiles.length == 0) return;

    switch(feature) {
      case this.EFEATURES.images:
        filterFiles.forEach(e => {
          ImageUtil.resizeImage(e, 640).subscribe(
            newFile => {
              const reader = new FileReader();
              reader.onload = () => {
                this.uploadImageFiles.push({
                  id: 0,
                  image: String(reader.result), 
                  fileName: newFile.name, 
                  folderPath: 'garments'
                });
              }
              reader.readAsDataURL(newFile);
            }
          );
        });
        break;
        case this.EFEATURES.patterns:
          filterFiles.forEach(e => {
            // imagen de tamaño original para mejor calidad de procesamiento
            const reader = new FileReader();
            reader.onload = () => {
              this.uploadPatternFiles.push({
                id: 0,
                image: String(reader.result),
                fileName: e.name,
                folderPath: 'patterns'
              });
            };
            reader.readAsDataURL(e);
  
            // imagen de scalada para mejor visualización
            ImageUtil.resizeImage(e, 640).subscribe(
              newFile => {
                const reader2 = new FileReader();
                reader2.onload = () => this.uploadPatterns.push(reader2.result);
                reader2.readAsDataURL(newFile);
              }
            );
          });
          break;
    }

    $event.target.value = '';
  }

  removeImage(idx: number, feature: number) {
    if(feature == this.EFEATURES.images)
      this.uploadImageFiles = this.uploadImageFiles.filter((_, index) => index !== idx);
    else {
      this.uploadPatterns = this.uploadPatterns.filter((_, index) => index !== idx);
      this.uploadPatternFiles = this.uploadPatternFiles.filter((_, index) => index !== idx);
    }
  }

  updateGarmentImagesAndPatterns() {

    if(this.uploadImageFiles.length !=0 && this.uploadPatterns.length != 0) {
    const garmentUpdateImages: GarmentUpdateImages = {
      codeGarment: this.garmentDetail.codeGarment,
      atelierId: 0,
      images: this.uploadImageFiles,
    };

    const garmetUpdatePatterns: GarmentUpdateImages = {
      codeGarment: this.garmentDetail.codeGarment,
      atelierId: 0,
      images: this.uploadPatternFiles,
    }

    console.log(garmentUpdateImages);
    
    this.isSaving = true;
    this.garmentService.updateImages(garmentUpdateImages).subscribe(
      res => {
        this.garmentService.updatePatterns(garmetUpdatePatterns).subscribe(
          res2 => {
            this.messageAlert = 'Prenda actualizada con éxito';
            this.typeAlert = 'success';
            this.showAlert = true;
            this.getGarmentDetail();
            //this._toogleOptionsSub.unsubscribe();
            setTimeout(() => {
              this.editModeImages = false;
              this.isSaving = false;
            }, 2000);
          },
          err2 => {
            this.messageAlert = err2.message;
            this.typeAlert = 'error'
            this.showAlert = true;
            this.isSaving = false;
          }
        );
      },
      (err) => {
        this.messageAlert = err.message;
        this.typeAlert = 'error'
        this.showAlert = true;
        this.isSaving = false;
      }
    );
    } else {
      this.messageAlert = 'Tiene que existir al menos una imagen de catálogo y un patrón de confección';
      this.typeAlert = 'error';
      this.showAlert = true;
    }
  }

  ngOnDestroy(): void {
    this._garmentDetial$.unsubscribe();
    this._toogleOptionsSub.unsubscribe();
  }

}
