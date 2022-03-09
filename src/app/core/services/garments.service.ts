import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GarmentMin } from '../models/garments/garment-min';
import { GarmentQuery } from '../models/garments/garment-query';
import { IMAGE_NOT_FOUND } from '../utils/assets.constants';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class GarmentsService {

  private readonly GESTION_API = environment.apiGestionUrl;
  private readonly URI_GARMENTS: string = this.GESTION_API + '/garments';
  private readonly IMG_NOT_FOUND: string = IMAGE_NOT_FOUND;

  constructor(
    private http: HttpClient,
    private userDataService: UserDataService,
  ) { }

  getAllByQuery(filterString?: string, category?: number): Observable<GarmentMin[]>{
    const query: GarmentQuery = {
      //atelierId: this.userDataService.atelierId,
      atelierId: 1,
      filterString: filterString,
      category: category,
    };

    return this.http.post<GarmentMin[]>(`${this.URI_GARMENTS}/by-query`, query).pipe(
      map((res) => {
        res.forEach(g => { if(!g.imageUrl) g.imageUrl = this.IMG_NOT_FOUND });
        return res;
      })
    );
  }
}
