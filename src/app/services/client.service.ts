import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {ClientDetails} from '../models/client-details';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() {
  }

  public getClientById(clientId: number): Observable<ClientDetails> {
    return of({
      name: 'Example name',
      email: 'mail@example.com',
      phone: '123456789',
    }).pipe(delay(1000));
  }

}
