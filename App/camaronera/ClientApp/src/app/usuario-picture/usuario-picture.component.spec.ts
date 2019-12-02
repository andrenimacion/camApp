import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPictureComponent } from './usuario-picture.component';

describe('UsuarioPictureComponent', () => {
  let component: UsuarioPictureComponent;
  let fixture: ComponentFixture<UsuarioPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
