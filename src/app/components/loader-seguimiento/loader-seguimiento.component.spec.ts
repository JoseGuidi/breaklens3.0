import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderSeguimientoComponent } from './loader-seguimiento.component';

describe('LoaderSeguimientoComponent', () => {
  let component: LoaderSeguimientoComponent;
  let fixture: ComponentFixture<LoaderSeguimientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderSeguimientoComponent]
    });
    fixture = TestBed.createComponent(LoaderSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
