import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrentsComponent } from './carrents.component';

describe('CarrentsComponent', () => {
  let component: CarrentsComponent;
  let fixture: ComponentFixture<CarrentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
