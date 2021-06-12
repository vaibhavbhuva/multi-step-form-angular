import { AbstractControl, AsyncValidatorFn, FormArray, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash-es';
import { Observable, of } from 'rxjs';
import {  map, delay } from 'rxjs/operators';

export class RegexConstants {
  public static PASSWORD_REGEXP = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~.,)(}{\\[!"#$%&\'()*+,-./:;<=>?@[^_`{|}~\\]])(?=\\S+$).{8,}';
}

export class CustomValidators {

  private static emailTaken = ['abc@gmail.com', 'xyz@gmail.com', 'hello@gmail.com', 'bye@gmail.com'];
  constructor() {}

  static testValidator = (m): ValidatorFn => {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      return null;
    };
  }

  static RegexValidator = (reg: any): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const specRegex = new RegExp(reg);
      if (control.value && !specRegex.test(control.value)) {
        return { RegexValidator: true };
      }
      return null;
    };
  }


  static confirmedValidator = (controlName: string, matchingControlName: string): ValidatorFn => {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      console.log('confirmedValidator');
      if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
  }

  static notEqualTo = (notEqualControl: AbstractControl): ValidatorFn => {
    let subscribe = false;
    return (control: AbstractControl): ValidationErrors => {
      if (!subscribe) {
        subscribe = true;
        notEqualControl.valueChanges.subscribe(() => {
          control.updateValueAndValidity();
        });
      }

      const v: string = control.value;
      if (notEqualControl.value == null && v == null) {
        return null;
      }
      return notEqualControl.value !== v ? null : { notEqualTo: false };
    };
  }

  static equalTo = (equalControl: AbstractControl): ValidatorFn => {
    let subscribe = false;
    return (control: AbstractControl): ValidationErrors => {
      if (!subscribe) {
        subscribe = true;
        equalControl.valueChanges.subscribe(() => {
          control.updateValueAndValidity();
        });
      }
      const v: string = control.value;
      return equalControl.value === v ? null : { equalTo: false };
    };
  }


  // const specRegex = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~.,)(}{\\[!"#$%&\'()*+,-./:;<=>?@[^_`{|}~\\]])(?=\\S+$).{8,}');
  // if (!specRegex.test(val)) {
  //   this.passwordError = _.get(this.resourceService, 'frmelmnts.lbl.passwd');
  //   passCtrl.setErrors({ passwordError: this.passwordError });
  // } else if (emailVal === val || this.signUpForm.controls.name.value === val) {
  //   this.passwordError = _.get(this.resourceService, 'frmelmnts.lbl.passwderr');
  //   passCtrl.setErrors({ passwordError: this.passwordError });
  // } else {
  //   this.passwordError = _.get(this.resourceService, 'frmelmnts.lbl.passwd');
  //   passCtrl.setErrors(null);
  // }


  static minSelectedCheckboxesValidator = (minRequired: number = 1, controlName: string): ValidatorFn => {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      let checked = 0;
      const formArr = formGroup.get(controlName) as FormArray;
      Object.keys(formArr.controls).forEach(key => {
        const control = formArr.controls[key];
        if (control.value === true) { checked ++; }
      });
      if (checked < minRequired) {
        return { notSelected: true};
      }
      return null;
    };
  }

  static timerValidator(startTimeField: string, endTimeField: string, errorName: string = 'timeErr'): ValidatorFn {
      return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
          let startTime = formGroup.get(startTimeField).value;
          let endTime = formGroup.get(endTimeField).value;
          if ((!_.isEmpty(startTime) && !_.isEmpty(endTime))) {
            startTime = moment(startTime.trim(), 'HH:mm');
            endTime = moment(endTime.trim(), 'HH:mm');
            if (endTime.isSameOrBefore(startTime)) {
                formGroup.get(endTimeField).patchValue(null);
                return {[errorName]: true};
            }
          }
          return null;
      };
  }

  static validateEmailNotTaken(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      console.log(control.value);
      return of(this.emailTaken.includes(control.value)).pipe(delay(500)).pipe(
        map((isExists: boolean) => isExists ? {emailTaken: true} : null)
      );
    };
  }

}
