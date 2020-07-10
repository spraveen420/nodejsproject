import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrentalsComponent } from './carrentals.component';

describe('CarrentalsComponent', () => {
  let component: CarrentalsComponent;
  let fixture: ComponentFixture<CarrentalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrentalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
