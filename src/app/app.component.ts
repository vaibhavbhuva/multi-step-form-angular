import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { weekdays } from './config';
import { CustomValidators, RegexConstants } from './helper/custom.validators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'multi-step-form-angular';
  public currentStep = 0;
  public steps: Array<any>;
  public form: FormGroup;
  public weekdays: Array<any> = weekdays;
  ngOnInit() {
    this.form = new FormGroup({
      accountDetails: new FormGroup({
          userName: new FormControl('', Validators.required),
          email: new FormControl('', {
            validators: [ Validators.required, Validators.email],
            asyncValidators: CustomValidators.validateEmailNotTaken(),
            updateOn: 'blur'
          }),
          password: new FormControl('', [
            Validators.required,
            CustomValidators.RegexValidator(RegexConstants.PASSWORD_REGEXP),
            Validators.minLength(8)
          ]),
          confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
          checkPolicy: new FormControl(false, Validators.requiredTrue)
      }, [CustomValidators.confirmedValidator('password', 'confirmPassword')]),
      timeDetails: new FormGroup({
          weekdays: this.createWeekdays(this.weekdays),
          hiddenWeekdays: new FormControl([]),
          setTime: new FormControl('yes'),
          startTime: new FormControl('', Validators.required),
          endTime: new FormControl('', Validators.required),
          days: new FormControl('', Validators.required)
      }, [
        CustomValidators.minSelectedCheckboxesValidator(1, 'weekdays'),
        CustomValidators.timerValidator('startTime', 'endTime')
      ]),
      avtarDetails: new FormGroup({
        avatar: new FormControl(null, [Validators.required]),
      })
    });
    this.steps = [
      {
          label: 'Account Details',
          isValid: this.isStepValid,
          validate: this.shouldValidate
      },
      {
        label: 'Time Details',
        isValid: this.isStepValid,
        validate: this.shouldValidate
      },
      {
        label: 'Avtar Details',
        isValid: this.isStepValid,
        validate: this.shouldValidate
      }
    ];
  }

  createWeekdays(weekdaysInputs) {
    const arr = weekdaysInputs.map(day => {
      return new FormControl(day.selected || false);
    });
    return new FormArray(arr);
  }

  private isStepValid = (index: number): boolean => {
    return this.getGroupAt(index).valid || this.currentGroup.untouched;
  }

  private shouldValidate = (index: number): boolean => {
      return this.getGroupAt(index).touched && this.currentStep >= index;
  }

  public get currentGroup(): FormGroup {
    return this.getGroupAt(this.currentStep);
  }

  private getGroupAt(index: number): FormGroup {
    const groups = Object.keys(this.form.controls).map(groupName =>
        this.form.get(groupName)
        ) as FormGroup[];

    return groups[index];
  }

  public next(): void {
    if (this.currentGroup.valid && this.currentStep !== this.steps.length) {
        this.currentStep += 1;
        return;
    }

    this.markFormGroupTouched(this.currentGroup);
  }

  public prev(): void {
      this.currentStep -= 1;
  }

  public submit(): void {
      if (!this.currentGroup.valid) {
          this.markFormGroupTouched(this.currentGroup);
      }
      if (this.form.valid) {
          console.log('Submitted data', this.form.value);
      }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
