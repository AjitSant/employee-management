import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { EmpInterface } from 'src/app/interfaces/app.model';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { EmpDashboardComponent } from './emp-dashboard.component';
import { SimpleModalComponent } from '../modal/simple-modal/simple-modal.component';
import { of, throwError } from 'rxjs';

describe('EmpDashboardComponent', () => {
  let component: EmpDashboardComponent;
  let fixture: ComponentFixture<EmpDashboardComponent>;

  beforeEach(() => {
    const apiServiceStub = () => ({
      getEmpData: () => ({
        pipe: () => ({
          subscribe: (() => { })
        })
      }),
      deleteData: () => ({
        pipe: () => ({
          subscribe: (() => { })
        })
      })
    });
    const matDialogStub = () => ({
      open: (simpleModalComponent: any, object: any) => ({})
    });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EmpDashboardComponent],
      providers: [
        { provide: ApiService, useFactory: apiServiceStub },
        { provide: MatDialog, useFactory: matDialogStub }
      ]
    });
    spyOn(EmpDashboardComponent.prototype, 'getEmpData');
    fixture = TestBed.createComponent(EmpDashboardComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`displayedColumns has default value`, () => {
    expect(component.displayedColumns).toEqual([
      `id`,
      `fname`,
      `lname`,
      `email`,
      `mobile`,
      `salary`,
      `action`
    ]);
  });

  describe('openDialog', () => {
    it('makes expected calls', () => {
      const empInterfaceStub: EmpInterface = <any>{};
      const res = {
        componentInstance: {
          apiSuccessEvent: new EventEmitter()
        }
      };
      spyOn((component as any).dialog, 'open').and.callFake(() => {
        return res;
      });
      component.openDialog(empInterfaceStub);
      res.componentInstance.apiSuccessEvent.emit(true);
      expect(component.getEmpData).toHaveBeenCalled();
    });
  });

  describe('confirmDelete', () => {
    it('makes expected calls', () => {
      spyOn(component,'deleteEmpForm');
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
      expect(component.deleteEmpForm).toHaveBeenCalled();
    });
  });

  describe('editEmpForm', () => {
    it('makes expected calls', () => {
      const empInterfaceStub: EmpInterface = <any>{};
      spyOn((component as any).dialog, 'open').and.callFake(() => { return { componentInstance: SimpleModalComponent } });
      spyOn(component, 'openDialog');
      component.editEmpForm(empInterfaceStub);
      expect(component.openDialog).toHaveBeenCalled();
    });
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(EmpDashboardComponent.prototype.getEmpData).toHaveBeenCalled();
    });
  });

  describe('getEmpData', () => {
    it('makes expected calls', () => {
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      const res = [
        {
          id: 1,
          fname: 'ajit',
          lname: 'sant',
          email: 'ajit@test.com',
          mobile: 9812087198,
          salary: 90000,
          action: {
            edit: 'Edit',
            delete: 'Delete'
          }
        }
      ];
      spyOn(apiServiceStub, 'getEmpData').and.returnValue(of(res));
      (<jasmine.Spy>component.getEmpData).and.callThrough();
      component.getEmpData();
      expect(apiServiceStub.getEmpData).toHaveBeenCalled();
    });
  });

  describe('addEmp', () => {
    it('makes expected calls', () => {
      spyOn(component, 'openDialog');
      component.addEmp();
      expect(component.openDialog).toHaveBeenCalled();
    });
  });

  describe('deleteEmpForm', () => {
    it('makes expected calls', () => {
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      spyOn(apiServiceStub, 'deleteData').and.returnValue(of({}));
      component.deleteEmpForm(1);
      expect(component.delClass).toEqual('alert-success');
    });
    it('makes expected calls in error', () => {
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      spyOn(apiServiceStub, 'deleteData').and.returnValue(throwError('err'));
      component.deleteEmpForm(1);
      expect(component.delClass).toEqual('alert-warning');
    });
  });
});
