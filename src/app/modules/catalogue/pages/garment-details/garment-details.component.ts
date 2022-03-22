import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GarmentRead } from 'src/app/core/models/garments/garment-read';
import { GarmentsService } from 'src/app/core/services/garments.service';

@Component({
  selector: 'app-garment-details',
  templateUrl: './garment-details.component.html',
  styleUrls: ['./garment-details.component.scss']
})
export class GarmentDetailsComponent implements OnInit {

  isLoading: boolean = false;
  showAlert: boolean;
  messageAlert: string;
  typeAlert: string;


  codeGarment: string
  garmentDetail: GarmentRead;

  private _selectedImage: string;

  private _garmentDetial$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private garmentService: GarmentsService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params: any) => {
        this.codeGarment = params.codeGarment;
        this.getGarmentDetail();
      }
    );
  }

  private getGarmentDetail() {
    this._garmentDetial$ = this.garmentService.getDetail(this.codeGarment).subscribe(
      res => {
        this.garmentDetail = res;
        this._selectedImage = this.garmentDetail.images[0];
      },
      err => {
        this.isLoading = true;
        this.messageAlert = err.message;
        this.typeAlert = 'error';
        this.showAlert = true;
      }
    );
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

  borderImagePreview(image: string): boolean {
    if(image === this._selectedImage) return true;
    return false;
  }

}
