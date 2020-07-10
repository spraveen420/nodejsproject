import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrentComponent } from './carrent.component';

describe('CarrentComponent', () => {
  let component: CarrentComponent;
  let fixture: ComponentFixture<CarrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
