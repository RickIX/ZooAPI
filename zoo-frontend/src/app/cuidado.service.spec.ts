import { TestBed } from '@angular/core/testing';

import { CuidadoService } from './cuidado.service';

describe('CuidadoService', () => {
  let service: CuidadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuidadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
