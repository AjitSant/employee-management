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
});
