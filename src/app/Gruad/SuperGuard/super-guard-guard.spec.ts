import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { superGuardGuard } from './super-guard-guard';

describe('superGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => superGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
