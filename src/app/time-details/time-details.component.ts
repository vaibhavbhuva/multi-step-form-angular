import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { weekdays } from '../config';
import * as _ from 'lodash-es';
import * as moment from 'moment';
import { startWith } from 'rxjs/operators';


@Component({
  selector: 'app-time-details',
  templateUrl: './time-details.component.html',
  styleUrls: ['./time-details.component.scss']
})
export class TimeDetailsComponent implements OnInit {
  @Input() public timeDetails: FormGroup;
  public weekdays: Array<any> = weekdays;
  constructor() { }

  ngOnInit() {
    this.onValueChanges();
  }

  onValueChanges() {

    // For weekday value changes
    let selectedDays;
    this.weekDaysFormArray.valueChanges.subscribe(values => {
      selectedDays = [];
      _.map(values, (selected, index) => {
         if (selected) { selectedDays.push(weekdays[index].name); }
      });
      this.timeDetails.get('hiddenWeekdays').patchValue(selectedDays);
    });

    // Disable/Enable start and end time input
    this.timerFormControl.valueChanges.pipe(
      startWith(this.timerFormControl.value))
      .subscribe(value => {
        if (value === 'no') {
          this.timeDetails.get('startTime').disable();
          this.timeDetails.get('endTime').disable();
        } else {
          this.timeDetails.get('startTime').enable();
          this.timeDetails.get('endTime').enable();
        }
    });

  }

  get weekDaysFormArray(): FormArray {
    return this.timeDetails.get('weekdays') as FormArray;
  }

  get timerFormControl(): FormControl {
    return this.timeDetails.get('setTime') as FormControl;
  }

  get getExpiryTime() {
    return moment().add(this.timeDetails.get('days').value, 'days').format('ddd Do MMM');
  }

}
