import {Attribute, Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appPasswordValidation]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PaswordValidationDirective,
    multi: true
  }]
})

export class PaswordValidationDirective implements Validator {

  constructor(@Attribute('appPasswordValidation') public appPasswordValidation: string,
              @Attribute('reverseValidity') public reverseValidity: string) {
  }
  private get isReverse() {
    if (!this.reverseValidity) { return false; }
    return this.reverseValidity === 'true';
  }
  validate(control: AbstractControl): { [key: string]: any } {
    const value = control.value;
    const valueToValidate = control.root.get(this.appPasswordValidation);

    if (valueToValidate && value !== valueToValidate.value && !this.isReverse) { return {
      appPasswordValidation: false
    };
    }
    if (valueToValidate && value === valueToValidate.value && this.isReverse) {
      delete valueToValidate.errors.appPasswordValidation;
      if (!Object.keys(valueToValidate.errors).length) { valueToValidate.setErrors(null); }
    }

    // value not equal and reverse
    if (valueToValidate && value !== valueToValidate.value && this.isReverse) {
      valueToValidate.setErrors({ appPasswordValidation: false });
    }

    return null;
  }
}
