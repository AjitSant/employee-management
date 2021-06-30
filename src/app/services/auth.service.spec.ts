import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    const apiServiceStub = () => ({});
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: ApiService, useFactory: apiServiceStub }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('isLoggedIn', () => {
    it('returns true for token', () => {
      spyOn(localStorage, 'getItem').and.returnValue('token');
      expect(service.isLoggedIn()).toBeTruthy();
    })
    it('returns false for no token', () => {
      spyOn(localStorage, 'getItem').and.returnValue('');
      expect(service.isLoggedIn()).toBeFalsy();
    })
  });
});
