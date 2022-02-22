import { AtelierCreate } from "../ateliers/atelier-create";

export interface UserOwnerCreate {
  nameUser: string;
  lastNameUser: string;
  email: string;
  password: string;
  dni: string;
  atelier: AtelierCreate;
}
