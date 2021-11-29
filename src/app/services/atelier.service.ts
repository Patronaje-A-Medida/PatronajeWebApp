import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {Atelier} from '../models/atelier';

@Injectable({
  providedIn: 'root'
})
export class AtelierService {

  constructor() {
  }

  public getAtelierById(atelierId: number): Observable<Atelier> {
    return of({
      name: 'Example name',
    }).pipe(delay(1000));
  }

}
