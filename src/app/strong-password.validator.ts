import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const password = control.value;
    const valid = strongRegex.test(password);
    return valid ? null : { 'strongPasswordError': { password } };
  };
}
