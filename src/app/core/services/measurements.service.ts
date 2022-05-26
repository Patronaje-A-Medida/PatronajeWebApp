import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BodyMeasurements } from '../models/measurements/body-measurements';

@Injectable({
  providedIn: 'root'
})
export class MeasurementsService {

  private readonly PATRONES_MEDIDAS_API = environment.apiPatronesMedidas;
  private readonly URI_BODYMEASUREMENTS = this.PATRONES_MEDIDAS_API + '/body-measurements';

  constructor(
    private http: HttpClient,
  ) { }

  getLastMeasurements(id: number): Observable<BodyMeasurements> {
    return this.http.get<BodyMeasurements>(`${this.URI_BODYMEASUREMENTS}/last-measurements/${id}`);
  }
}
