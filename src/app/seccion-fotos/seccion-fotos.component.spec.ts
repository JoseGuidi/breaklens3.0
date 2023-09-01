import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionFotosComponent } from './seccion-fotos.component';

describe('SeccionFotosComponent', () => {
  let component: SeccionFotosComponent;
  let fixture: ComponentFixture<SeccionFotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeccionFotosComponent]
    });
    fixture = TestBed.createComponent(SeccionFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
