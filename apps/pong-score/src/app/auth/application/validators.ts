import { ValidationErrors, ValidatorFn, AbstractControl } from "@angular/forms";
/**
 * Validators
 */
export class Validators {
  constructor() { }

  /**
   * Patterns validator
   * @param regex
   * @param error
   * @returns validator
   */
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }
  /**
   * Passwords match validator
   * @param control
   */
  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password')?.value; // get password from our password form control
    const confirmPassword: string = control.get('confirm_password')?.value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirm_password')?.setErrors({ NoPassswordMatch: true });
    }
  }
}
