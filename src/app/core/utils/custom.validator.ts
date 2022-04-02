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

  public static ValidateAmount(): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const amount: number = Number(control.value);

      if(amount === NaN || amount < 1) return { invalidAmount: true };
      return null
    }
  }
}
