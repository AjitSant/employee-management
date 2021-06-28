import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { EmpInterface } from '../interfaces/app.model';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('postData', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const empInterfaceStub: EmpInterface = <any>{};
      service.postData(empInterfaceStub).subscribe(res => {
        expect(res).toEqual(empInterfaceStub);
      });
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('POST');
      req.flush(empInterfaceStub);
      httpTestingController.verify();
    });
  });

  describe('postDashData', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const empInterfaceStub: EmpInterface = <any>{};
      service.postDashData(empInterfaceStub).subscribe(res => {
        expect(res).toEqual(empInterfaceStub);
      });
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('POST');
      req.flush(empInterfaceStub);
      httpTestingController.verify();
    });
  });

  describe('getEmpData', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('GET');
      req.flush({});
      httpTestingController.verify();
    });
  });

  describe('getDashData', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const req = httpTestingController.expectOne('HTTP_ROUTE_GOES_HERE');
      expect(req.request.method).toEqual('GET');
      req.flush({});
      httpTestingController.verify();
    });
  });
});
