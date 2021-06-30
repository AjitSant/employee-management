import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { EmpFormComponent } from './emp-form.component';
import { of } from 'rxjs';

describe('EmpFormComponent', () => {
  let component: EmpFormComponent;
  let fixture: ComponentFixture<EmpFormComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: () => ({}) });
    const historyStub = () => ({
      state: {
        empData: {}
      }
    })
    const apiServiceStub = () => ({
      postDashData: () => ({
        pipe: () => ({
          subscribe: (() => { })
        })
      }),
      updateDashData: () => ({
        pipe: () => ({
          subscribe: (() => { })
        })
      }),
      postData: () => ({
        pipe: () => ({
          subscribe: (() => { })
        })
      }),
      updateData: () => ({
        pipe: () => ({
          subscribe: (() => { })
        })
      })
    });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EmpFormComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ApiService, useFactory: apiServiceStub },
        { provide: History, useFactory: historyStub }
      ]
    });
    fixture = TestBed.createComponent(EmpFormComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`submitName has default value`, () => {
    expect(component.submitName).toEqual(`Add`);
  });

  it(`dashCall has default value`, () => {
    expect(component.dashCall).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      component.empForm = new FormGroup({
        fname: new FormControl(''),
        lname: new FormControl(''),
        email: new FormControl(''),
        mobile: new FormControl(''),
        salary: new FormControl('')
      });
      component.data = {
        empData: {
          id: 1,
          fname: 'ajit',
          lname: 'sant',
          email: 'ajit@test.com',
          mobile: 9812087198,
          salary: 90000
        }
      };
      spyOn(component, 'makeEditEntry');
      component.ngOnInit();
      expect(component.makeEditEntry).toHaveBeenCalled();
    });
  });

  describe('handleErr', () => {
    it('makes expected calls', () => {
      spyOn(component.apiSuccess, 'emit');
      component.handleErr('added');
      expect(component.submitClass).toEqual('alert-warning');
    });
  });

  describe('handleSuccess', () => {
    it('makes expected calls', () => {
      spyOn(component.apiSuccess, 'emit');
      component.handleSuccess('added');
      expect(component.submitClass).toEqual('alert-success');
    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      component.empForm = new FormGroup({
        fname: new FormControl(''),
        lname: new FormControl(''),
        email: new FormControl(''),
        mobile: new FormControl(''),
        salary: new FormControl('')
      })
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      spyOn((component as any).router,'navigate');
      (component as any).editData = {id:1};
      component.submitName ="Add"
      spyOn(component, 'handleSuccess');
      spyOn(component, 'handleErr');
      spyOn(apiServiceStub, 'postDashData').and.returnValue(of({}));
      spyOn(apiServiceStub, 'updateDashData').and.returnValue(of({}));
      spyOn(apiServiceStub, 'postData').and.returnValue(of({}));
      spyOn(apiServiceStub, 'updateData').and.returnValue(of({}));
      component.onSubmit();
      component.dashCall = true;
      component.onSubmit();
      expect(component.handleSuccess).toHaveBeenCalled();
      component.submitName = "Update";
      component.onSubmit();
      component.dashCall = false;
      component.onSubmit();
    });
  });
});
