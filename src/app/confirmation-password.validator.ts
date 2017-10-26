import {AbstractControl, ValidatorFn} from '@angular/forms';
import {isUndefined} from "util";

export function confPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    let confPassword = control.value;
    let originalPassword = control.root.value.verification;
    if(originalPassword){
      if (originalPassword.password && confPassword !== originalPassword.password) {
        return {validateEqual:true};
      }
      return null;
    }
    else {
      return null;
    }
  };

}
