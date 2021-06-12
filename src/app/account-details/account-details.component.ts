import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit, AfterViewInit {
  @Input() public accountDetails: FormGroup;
  @ViewChild('password') public textbox: ElementRef;
  public passwordVisibility: boolean;
  constructor() { }

  ngOnInit() {
    this.passwordVisibility = true;
  }

  public ngAfterViewInit(): void {
    this.textbox.nativeElement.type = 'password';
  }

  public toggleVisibility(): void {
    const inputEl = this.textbox.nativeElement;
    inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
    this.passwordVisibility = !this.passwordVisibility;
}

}
