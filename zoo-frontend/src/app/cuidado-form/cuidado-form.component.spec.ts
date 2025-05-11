import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuidadoFormComponent } from './cuidado-form.component';

describe('CuidadoFormComponent', () => {
  let component: CuidadoFormComponent;
  let fixture: ComponentFixture<CuidadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuidadoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuidadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
