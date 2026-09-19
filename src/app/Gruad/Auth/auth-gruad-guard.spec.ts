import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGruadGuard } from './auth-gruad-guard';

describe('authGruadGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGruadGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
