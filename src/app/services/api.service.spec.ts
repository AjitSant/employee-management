import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { EmpInterface } from '../interfaces/app.model';
import { ApiService } from './api.service';
import { dashboardUrl, empUrl, loginUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('postData', () => {
    it('makes expected calls', () => {
      const empInterfaceStub: EmpInterface = <any>{};
      service.postData(empInterfaceStub).subscribe(res => {
        expect(res).toEqual(empInterfaceStub);
      });
      const req = httpTestingController.expectOne(empUrl);
      expect(req.request.method).toEqual('POST');
      req.flush(empInterfaceStub);
    });
  });

  describe('postDashData', () => {
    it('makes expected calls', () => {
      const empInterfaceStub: EmpInterface = <any>{};
      service.postDashData(empInterfaceStub).subscribe(res => {
        expect(res).toEqual(empInterfaceStub);
      });
      const req = httpTestingController.expectOne(dashboardUrl);
      expect(req.request.method).toEqual('POST');
      req.flush(empInterfaceStub);
    });
  });

  describe('getEmpData', () => {
    it('makes expected calls', inject([ApiService], fakeAsync(() => {
      service.getEmpData().subscribe();
      const req = httpTestingController.expectOne(empUrl);
      expect(req.request.method).toEqual('GET');
      tick();
    })));
  });

  describe('getDashData', () => {
    it('makes expected calls', inject([ApiService], fakeAsync((service: ApiService) => {
      service.getDashData().subscribe();
      const req = httpTestingController.expectOne(dashboardUrl);
      expect(req.request.method).toEqual('GET');
      tick();
    })));
  });

  //ajit

  describe('updateData', () => {
    it('makes expected calls', inject([ApiService], fakeAsync((service: ApiService) => {
      const empInterfaceStub: EmpInterface = <any>{};
      service.updateData(empInterfaceStub, 1).subscribe();
      const req = httpTestingController.expectOne(empUrl + 1);
      expect(req.request.method).toEqual('PUT');
      tick();
    })));
  });

  describe('updateDashData', () => {
    it('makes expected calls', inject([ApiService], fakeAsync((service: ApiService) => {
      const empInterfaceStub: EmpInterface = <any>{};
      service.updateDashData(empInterfaceStub, 1).subscribe();
      const req = httpTestingController.expectOne(dashboardUrl + 1);
      expect(req.request.method).toEqual('PUT');
      tick();
    })));
  });

  describe('deleteData', () => {
    it('makes expected calls', inject([ApiService], fakeAsync((service: ApiService) => {
      service.deleteData(1).subscribe();
      const req = httpTestingController.expectOne(empUrl + 1);
      expect(req.request.method).toEqual('DELETE');
      tick();
    })));
  });

  describe('deleteDashData', () => {
    it('makes expected calls', inject([ApiService], fakeAsync((service: ApiService) => {
      service.deleteDashData(1).subscribe();
      const req = httpTestingController.expectOne(dashboardUrl + 1);
      expect(req.request.method).toEqual('DELETE');
      tick();
    })));
  });

  describe('login', () => {
    it('makes expected calls', inject([ApiService], fakeAsync((service: ApiService) => {
      const data = {
        email: 'test@test.com',
        password: 'abcd'
      }
      service.login(data).subscribe();
      const req = httpTestingController.expectOne(loginUrl);
      expect(req.request.method).toEqual('POST');
      tick();
    })));
  });

});
