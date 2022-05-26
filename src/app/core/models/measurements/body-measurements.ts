import { Measurements } from './measurements';

export interface BodyMeasurements {
  id: string;
  client_id: number;
  measurement_date: Date;
  measurements: Measurements[];
}
