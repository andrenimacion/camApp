import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimLogoComponent } from './anim-logo.component';

describe('AnimLogoComponent', () => {
  let component: AnimLogoComponent;
  let fixture: ComponentFixture<AnimLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
