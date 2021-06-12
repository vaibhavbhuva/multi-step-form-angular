import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvtarDetailsComponent } from './avtar-details.component';

describe('AvtarDetailsComponent', () => {
  let component: AvtarDetailsComponent;
  let fixture: ComponentFixture<AvtarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvtarDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvtarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
