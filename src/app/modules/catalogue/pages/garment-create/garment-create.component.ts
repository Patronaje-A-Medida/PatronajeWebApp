import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TypeRead } from 'src/app/core/models/configuration-types/type-read';
import { FeatureGarmentWrite } from 'src/app/core/models/garments/feature-garment-write';
import { GarmentImageFile } from 'src/app/core/models/garments/garment-image-file';
import { GarmentWrite } from 'src/app/core/models/garments/garment-write';
import { ConfigurationTypesService } from 'src/app/core/services/configuration-types.service';
import { GarmentsService } from 'src/app/core/services/garments.service';
import { EnumFeatures, EnumFeaturesString } from 'src/app/core/utils/features.enum';
import { ImageUtil } from 'src/app/core/utils/images.util';
import { RGXP_NUMBER_PRICE } from 'src/app/core/utils/regex.constants';
import { DocumentEventsService } from 'src/app/shared/services/document-events.service';

@Component({
  selector: 'app-garment-create',
  templateUrl: './garment-create.component.html',
  styleUrls: ['./garment-create.component.scss']
})
export class GarmentCreateComponent implements OnInit, OnDestroy {

  EFEATURES = EnumFeatures;
  EFEATURES_STRING = EnumFeaturesString;

  categories: TypeRead[];
  fabrics: TypeRead[];
  occasions: TypeRead[];

  showFabricOpts: boolean = false;
  showOccasionOpts: boolean = false;
  showZoomImage: boolean = false;

  selectedFabrics: TypeRead[] = [];
  selectedOccasions: TypeRead[] = [];
  selectedColors: string[] = [];

  uploadImageFiles: GarmentImageFile[] = [];
  uploadPatterns: any[] = [];
  uploadPatternFiles: GarmentImageFile[] = [];
  selectedImageToZoom: string;

  messageAlert: string;
  typeAlert: string;
  showAlert: boolean = false;
  
  garmentForm: FormGroup;
  newGarment: GarmentWrite;
  isSaving: boolean = false;
  canSave: boolean;
  
  showModal:boolean = false;;
  typeModal: string;
  messageModal: string;
  additionalMessageModal: string;

  @ViewChild('fabricOptions', {read: ElementRef, static: true})
  fabricOptions: ElementRef;

  @ViewChild('occasionOptions', {read: ElementRef, static: true})
  occasionOptions: ElementRef;

  private _toogleOptionsSub: Subscription;

  constructor(
    private configurationTypesService: ConfigurationTypesService,
    private garmentService: GarmentsService,
    private formBuilder: FormBuilder,
    private location: Location,
    private docEventsService: DocumentEventsService,
  ) { }

  ngOnInit(): void {
    this.categories = Array.from<TypeRead>(this.configurationTypesService.categoryTypes);
    this.fabrics = Array.from<TypeRead>(this.configurationTypesService.fabricTypes);
    this.occasions = Array.from<TypeRead>(this.configurationTypesService.occasionTypes);

    this.buildGarmentForm();

    this._toogleOptionsSub = this.docEventsService.documentClickedTarget.subscribe(
      target => this.documentClickListener(target)
    );

  }

  private buildGarmentForm(): void {
    this.garmentForm = this.formBuilder.group({
      codeGarment: ['', Validators.required],
      nameGarment: ['', [Validators.required, Validators.maxLength(100)]],
      firstRangePrice: ['', [Validators.required, Validators.pattern(RGXP_NUMBER_PRICE)]],
      secondRangePrice: ['', [Validators.required, Validators.pattern(RGXP_NUMBER_PRICE)]],
      description: ['', Validators.maxLength(250)],
      category: ['', Validators.required],
      fabrics: ['', Validators.required],
      occasions: ['', Validators.required],
      colors: ['', Validators.required],
      available: [true, Validators.required],
    });
  }

  private documentClickListener(target: any): void {
    const clickedInside = this.fabricOptions.nativeElement.contains(target);
    if(!clickedInside) this.showFabricOpts = false;
    
    const clickedInside2 = this.occasionOptions.nativeElement.contains(target);
    if(!clickedInside2) this.showOccasionOpts = false;
  }

  private resetForm(): void {
    this.garmentForm.reset();
    this.selectedFabrics = [];
    this.selectedOccasions = [];
    this.selectedColors = [];
    this.uploadImageFiles = [];
    this.uploadPatterns = [];
    this.uploadPatternFiles = [];
    this.categories = this.categories = Array.from<TypeRead>(this.configurationTypesService.categoryTypes);
  }

  selectItem(item: TypeRead, feature: number): void {
    let found: TypeRead;

    switch(feature) {
      case this.EFEATURES.fabric:
        this.garmentForm.get('fabrics').markAsTouched();
        found = this.selectedFabrics.find(e => e.key === item.key);
        if (found != null) {
          this.selectedFabrics = this.selectedFabrics.filter(e => e.key !== found.key);
        }
        else {
          this.selectedFabrics.push(item);
        }
        this.garmentForm.get('fabrics').setValue(this.selectedFabrics);
        break;
      case this.EFEATURES.occasion:
        this.garmentForm.get('occasions').markAsTouched();
        found = this.selectedOccasions.find(e => e.key === item.key);
        if (found != null) {
          this.selectedOccasions = this.selectedOccasions.filter(e => e.key !== found.key);
        }
        else {
          this.selectedOccasions.push(item);
        }
        this.garmentForm.get('occasions').setValue(this.selectedOccasions);
        break;
      default:
        break;
    }

  }

  removeSelectedItem(item: TypeRead, feature: number): void {
    this.showFabricOpts = false;

    switch(feature) {
      case this.EFEATURES.fabric:
        this.selectedFabrics = this.selectedFabrics.filter(e => e.key !== item.key);
        this.garmentForm.get('fabrics').setValue(this.selectedFabrics);
        break;
      case this.EFEATURES.occasion:
        this.selectedOccasions = this.selectedOccasions.filter(e => e.key !== item.key);
        this.garmentForm.get('occasions').setValue(this.selectedOccasions);
        break;
      default:
        break;
    }
  }

  changeColor($event: any) {
    this.garmentForm.get('colors').markAsTouched();
    this.selectedColors.push($event.target.value);
    this.garmentForm.get('colors').setValue(this.selectedColors);
  }

  getItemColor(item: string): string {
    if(item === '#ffffff') return `background-color: ${item}; border: solid 1px black;`
    else return 'background-color: ' + item;
  }

  removeSelectedColor(item: string) {
    this.selectedColors = this.selectedColors.filter(e => e !== item);
    this.garmentForm.get('colors').setValue(this.selectedColors);
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
              //this.uploadImageFiles.push({imageFile: newFile, fileName: newFile.name, folderPath: 'garments'});
              const reader = new FileReader();
              reader.onload = () => {
                this.uploadImageFiles.push({
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

  zoomSelectedImage(imgB64: string) {
    this.showZoomImage = true;
    this.selectedImageToZoom = imgB64;
  }

  closeZoom() {
    this.showZoomImage = false;
    this.selectedImageToZoom = '';
  }

  isInvalid(controlName: string): boolean {
    const formControl = this.garmentForm.get(controlName);
    return formControl.errors && formControl.touched;
  }

  hasError(controlName: string, validator: string): boolean {
    const formControl = this.garmentForm.get(controlName);
    return formControl.errors?.[validator] && formControl.touched;
  }

  buildGarment(): void {
    if (!this.garmentForm.valid) {
      this.garmentForm.markAllAsTouched();
      return;
    }

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
    } = this.garmentForm.value;

    this.newGarment = {
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

    const fabricFeatures: FeatureGarmentWrite[] = fabrics.map((e:TypeRead) => {
      return {
        value: e.description,
        typeFeature: this.EFEATURES_STRING.fabric,
        typeFeatureValue: e.value,
      } as FeatureGarmentWrite;
    });

    const occasionFeatures: FeatureGarmentWrite[] = occasions.map((e:TypeRead) => {
      return {
        value: e.description,
        typeFeature: this.EFEATURES_STRING.occasion,
        typeFeatureValue: e.value,
      } as FeatureGarmentWrite;
    });

    const colorFeatures: FeatureGarmentWrite[] = colors.map((e:string) => {
      return {
        value: e,
        typeFeature: this.EFEATURES_STRING.color,
        typeFeatureValue: this.EFEATURES.color,
      } as FeatureGarmentWrite;
    });
    

    this.newGarment.features.push(
      ...fabricFeatures, 
      ...occasionFeatures, 
      ...colorFeatures
    );
    this.newGarment.images = this.uploadImageFiles;
    this.newGarment.patterns = this.uploadPatternFiles;

    this.buildInfoModal();
    this.showModal = true;
    
  }

  private buildInfoModal(): void {
    const numImg = this.newGarment.images.length;
    const numPttrn = this.newGarment.patterns.length;

    if(numImg == 0 && numPttrn == 0) {
      this.typeModal = 'error';
      this.messageModal = 'La prenda a agregar no cuenta con imágenes para el catálogo y patrones de confección para el escalado a medida del cliente.';
      this.canSave = false;
      return;
    }

    if(numImg == 0) {
      this.typeModal = 'error';
      this.messageModal = 'La prenda a agregar no cuenta con imágenes para el catálogo.';
      this.canSave = false;
      return;
    }

    if(numPttrn == 0) {
      this.typeModal = 'error';
      this.messageModal = 'La prenda a agregar no cuenta con patrones de confección para el escalado a medida del cliente.';
      this.canSave = false;
      return;
    }

    this.messageModal = '¿Estás seguro de agregar esta prenda al catálogo?';
    this.typeModal = 'warning'
    this.canSave = true;
    return;
  }

  onAcceptModal(): void {
    if(!this.canSave) return;
    
    this.isSaving = true;
    this.garmentService.save(this.newGarment).subscribe(
      res => {
        this.messageAlert = 'Prenda agregada al catálogo con éxito';
        this.typeAlert = 'success';
        this.showAlert = true;
        this.isSaving = false;
        this.resetForm();
      },
      err => {
        this.messageAlert = err.message;
        this.typeAlert = 'error'
        this.showAlert = true;
        this.isSaving = false;
        this.resetForm();
      }
    );
  }

  onCancelModal(): void {
  }

  navigateToBack(): void {
    this.resetForm();
    this.location.back();
  }

  ngOnDestroy(): void {
    this._toogleOptionsSub.unsubscribe();
  }

}
