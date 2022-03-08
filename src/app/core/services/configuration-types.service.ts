import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TypesRead } from '../models/configuration-types/types-read';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationTypesService {

  private readonly GESTION_API = environment.apiGestionUrl;
  private readonly URI_TYPES: string = this.GESTION_API + '/configuration-types';

  private _configurationTypes: TypesRead;

  constructor(
    private http: HttpClient,
    private userDataService: UserDataService,
  ) { }

  getAll(): Promise<boolean> {
    /*if(!this.userDataService.token) {
      return new Promise((resolve, reject) => {
        resolve(true);
      })
    }

    const atelierId = this.userDataService.atelierId;*/

    const atelierId = 1;
    return this.http.get<TypesRead>(`${this.URI_TYPES}/${atelierId}`)
      .pipe(
        map((res) => {
          this._configurationTypes = res;
          return true;
        })
      )
      .toPromise();
  }

  get categoryTypes(): string[] {
    return this._configurationTypes.categories;
  }
}
