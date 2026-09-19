import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { baberGuard } from './baber-guard';

describe('baberGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => baberGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
