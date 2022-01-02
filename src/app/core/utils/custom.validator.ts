import { AbstractControl, ValidationErrors } from '@angular/forms';


export class CunstomValidators {

  public static ComparePassword(
    matchingControlName: string
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return Boolean(control.parent) && // !!control.parent
        Boolean(control.parent.value) &&
        control.value === control.parent.controls[matchingControlName].value
        ? null
        : { notMatch: true };
    };
  }
}
