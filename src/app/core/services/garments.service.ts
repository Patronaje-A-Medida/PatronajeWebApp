import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GarmentMin } from '../models/garments/garment-min';
import { GarmentQuery } from '../models/garments/garment-query';
import { GarmentRead } from '../models/garments/garment-read';
import { GarmentWrite } from '../models/garments/garment-write';
import { PagedResponse } from '../models/generics/paged-response';
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

  getAllByQuery(
    pageNumber: number = 1, 
    pageSize: number = 10,
    categories: number[],
    occasions: number[],
    filterString?: string,
    category?: number,
    ): Observable<PagedResponse<GarmentMin>>{
    const query: GarmentQuery = {
      //atelierId: this.userDataService.atelierId,
      atelierId: 1,
      filterString: filterString,
      category: category,
      categories: categories,
      occasions: occasions,
      pageNumber: pageNumber,
      pageSize: pageSize
    };

    return this.http.post<PagedResponse<GarmentMin>>(`${this.URI_GARMENTS}/by-query`, query).pipe(
      map((res) => {
        res.items.forEach(g => { if(!g.imageUrl) g.imageUrl = this.IMG_NOT_FOUND });
        return res;
      })
    );
  }

  save(body: GarmentWrite): Observable<boolean> {
    //body.atelierId = this.userDataService.atelierId,
    body.atelierId = 1
    console.log('service');
    console.log(body);
    return this.http.post<boolean>(`${this.URI_GARMENTS}/save`, body);
  }

  getDetail(codeGarment: string): Observable<GarmentRead> {
    //const atelierId = this.userDataService.atelierId;
    const atelierId = 1;

    const params = new HttpParams()
    .set('codeGarment', codeGarment)
    .set('atelierId', String(atelierId));

    return this.http.get<GarmentRead>(`${this.URI_GARMENTS}/details`, { params: params });
  }
}
