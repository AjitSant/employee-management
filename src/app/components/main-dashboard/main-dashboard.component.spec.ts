import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { EmpInterface } from 'src/app/interfaces/app.model';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule } from '@angular/forms';
import { MainDashboardComponent } from './main-dashboard.component';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { MatDialog } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

describe('MainDashboardComponent', () => {
  let component: MainDashboardComponent;
  let fixture: ComponentFixture<MainDashboardComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: (array: any) => ({}) });
    const apiServiceStub = () => ({
      getDashData: () => ({ pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }) }),
      deleteDashData: (empId: any) => ({ pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }) })
    });
    const matDialogStub = () => ({
      open: (simpleModalComponent: any, object: any) => ({})
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MainDashboardComponent, FilterPipe],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: ApiService, useFactory: apiServiceStub },
        { provide: MatDialog, useFactory: matDialogStub }
      ]
    });
    fixture = TestBed.createComponent(MainDashboardComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`dashData has default value`, () => {
    expect(component.dashData).toEqual([]);
  });

  describe('editDashboardData', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const empInterfaceStub: EmpInterface = <any>{};
      spyOn(routerStub, 'navigate').and.callThrough();
      component.editDashboardData(empInterfaceStub);
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  describe('confirmDelete', () => {
    it('makes expected calls', () => {
      spyOn(component, 'deleteDashboardData');
      const res = {
        componentInstance: {
          apiSuccessEvent: new EventEmitter()
        }
      };
      spyOn((component as any).dialog, 'open').and.callFake(() => {
        return res;
      });
      component.confirmDelete(1);
      res.componentInstance.apiSuccessEvent.emit(true);
      expect(component.deleteDashboardData).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getDashboardData').and.callThrough();
      component.ngOnInit();
      expect(component.getDashboardData).toHaveBeenCalled();
    });
  });

  describe('deleteDashboardData', () => {
    it('makes expected calls', () => {
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      spyOn(component, 'getDashboardData');
      spyOn(apiServiceStub, 'deleteDashData').and.returnValue(of({}));
      component.deleteDashboardData(1);
      expect(component.getDashboardData).toHaveBeenCalled();
    });
    it('makes expected calls in error', () => {
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      spyOn(apiServiceStub, 'deleteDashData').and.returnValue(throwError('err'));
      component.deleteDashboardData(1);
      expect(component.delClass).toEqual('alert-warning');
    });
  });

  describe('getDashboardData', () => {
    it('makes expected calls', () => {
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      spyOn(apiServiceStub, 'getDashData').and.callThrough();
      component.getDashboardData();
      expect(apiServiceStub.getDashData).toHaveBeenCalled();
    });
  });

  describe('addRecord', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.addRecord();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
