import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthenticateUserGuard } from './authenticate-user.guard';

describe('AuthenticateUserGuard', () => {
  let service: AuthenticateUserGuard;

  beforeEach(() => {
    const routerStub = () => ({ navigate: () => ({}) });
    const authServiceStub = () => ({ isLoggedIn: () => ({}) });
    TestBed.configureTestingModule({
      providers: [
        AuthenticateUserGuard,
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    service = TestBed.inject(AuthenticateUserGuard);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('canActivate', () => {
    it('makes expected calls', () => {
      const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{};
      const routerStub: Router = TestBed.inject(Router);
      const routerStateSnapshotStub: RouterStateSnapshot = <any>{};
      const authServiceStub: AuthService = TestBed.inject(AuthService);
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(authServiceStub, 'isLoggedIn').and.returnValue(true);
      service.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
      expect(authServiceStub.isLoggedIn).toHaveBeenCalled();
    });
    it('makes expected calls for logged out', () => {
      const activatedRouteSnapshotStub: ActivatedRouteSnapshot = <any>{};
      const routerStub: Router = TestBed.inject(Router);
      const routerStateSnapshotStub: RouterStateSnapshot = <any>{};
      const authServiceStub: AuthService = TestBed.inject(AuthService);
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(authServiceStub, 'isLoggedIn').and.returnValue(false);
      service.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
      expect(authServiceStub.isLoggedIn).toHaveBeenCalled();
    });
  });
});
