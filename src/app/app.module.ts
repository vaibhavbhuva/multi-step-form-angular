import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AvtarDetailsComponent } from './avtar-details/avtar-details.component';
import { CounterInputComponent } from './counter-input/counter-input.component';
import { TimeDetailsComponent } from './time-details/time-details.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountDetailsComponent,
    AvtarDetailsComponent,
    CounterInputComponent,
    TimeDetailsComponent
  ],
  imports: [
    BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
