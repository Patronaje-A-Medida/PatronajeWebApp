import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConfigurationTypeRead } from '../models/configuration-types/configuration-type-read';
import { TypeRead } from '../models/configuration-types/type-read';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationTypesService {

  private readonly GESTION_API = environment.apiGestionUrl;
  private readonly URI_TYPES: string = this.GESTION_API + '/configuration-types';

  private _configurationTypes: ConfigurationTypeRead;

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
    return this.http.get<ConfigurationTypeRead>(`${this.URI_TYPES}/${atelierId}`)
      .pipe(
        map((res) => {
          this._configurationTypes = res;
          return true;
        })
      )
      .toPromise();
  }

  get categoryTypes(): TypeRead[] {
    const categories = this._configurationTypes.categories;
    categories.push({key: 'todos', value: null, description: 'Todos'});
    return categories;
  }

  get orderStatusTypes(): TypeRead[] {
    const orderStatus = this._configurationTypes.orderStatus;
    orderStatus.push({key: 'todos', value: null, description: 'Todos'});
    return orderStatus;
  }

  get fabricTypes(): TypeRead[] {
    return this._configurationTypes.fabrics;
  }

  get occasionTypes(): TypeRead[] {
    return this._configurationTypes.occasions;
  }
}
