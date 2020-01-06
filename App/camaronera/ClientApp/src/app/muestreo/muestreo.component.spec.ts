import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuestreoComponent } from './muestreo.component';

describe('MuestreoComponent', () => {
  let component: MuestreoComponent;
  let fixture: ComponentFixture<MuestreoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuestreoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuestreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
