import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash-es';

@Component({
  selector: 'app-avtar-details',
  templateUrl: './avtar-details.component.html',
  styleUrls: ['./avtar-details.component.scss']
})
export class AvtarDetailsComponent implements OnInit {
  @Input() public avtarDetails: FormGroup;
  public imageURL: string;
  public imageError = 'Image is required';
  private allowedTypes = ['image/png', 'image/jpeg'];
  private maxSize = 600000;
  private maxHeight = 1500;
  private maxWidth = 1500;
  constructor() { }

  ngOnInit() {
    this.setImagePreview();
  }

  private setImagePreview(): void {
    if (this.avtarDetails.value.avatar) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      };
      reader.readAsDataURL(this.avtarDetails.value.avatar);
    }
  }

  fileChangeEvent(event: any) {
    this.imageError = 'Image is required';
    this.patchImageValue(null);
    const file = (event.target as HTMLInputElement).files[0];
    if (!file) { return; }
    if (!_.includes(this.allowedTypes, file.type)) {
      this.imageError = 'Only Images are allowed ( JPG | PNG )';
      return false;
    }

    if (file.size > this.maxSize) {
      this.imageError = 'Maximum size allowed is ' + this.maxSize / 1000 + 'Mb';
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = (rs: any) => {
        const imgHeight = rs.currentTarget.height;
        const imgWidth = rs.currentTarget.width;
        if (imgHeight > this.maxHeight && imgWidth > this.maxWidth) {
          this.imageError = `Maximum dimentions allowed ${this.maxHeight} * ${this.maxWidth} px`;
          return false;
        } else {
          const imgBase64Path = e.target.result;
          this.imageURL = imgBase64Path;
          this.patchImageValue(file);
        }
      };
    };
    reader.readAsDataURL(file);
  }

  patchImageValue(file) {
    this.avtarDetails.patchValue({
      avatar: file
    });
    this.avtarDetails.get('avatar').updateValueAndValidity();
  }

  removeImage($event) {
    this.patchImageValue(null);
    this.imageURL = null;
  }

}
