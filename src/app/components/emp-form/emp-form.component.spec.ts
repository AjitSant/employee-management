import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { EmpFormComponent } from './emp-form.component';

describe('EmpFormComponent', () => {
  let component: EmpFormComponent;
  let fixture: ComponentFixture<EmpFormComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: () => ({}) });
    const apiServiceStub = () => ({
      postDashData: () => ({ pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }) }),
      updateDashData: (value: any, id: any) => ({
        pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
      }),
      postData: () => ({ pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }) }),
      updateData: (value: any, id: any) => ({ pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }) })
    });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EmpFormComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ApiService, useFactory: apiServiceStub }
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
      })
      window.history.state.empData = {};
      spyOn(component, 'makeEditEntry').and.callThrough();
      component.ngOnInit();
      expect(component.makeEditEntry).toHaveBeenCalled();
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
      spyOn(component, 'handleSuccess').and.callThrough();
      spyOn(component, 'handleErr').and.callThrough();
      spyOn(apiServiceStub, 'postDashData').and.callThrough();
      spyOn(apiServiceStub, 'updateDashData').and.callThrough();
      spyOn(apiServiceStub, 'postData').and.callThrough();
      spyOn(apiServiceStub, 'updateData').and.callThrough();
      component.onSubmit();
      expect(component.handleSuccess).toHaveBeenCalled();
      expect(component.handleErr).toHaveBeenCalled();
      expect(apiServiceStub.postDashData).toHaveBeenCalled();
      expect(apiServiceStub.updateDashData).toHaveBeenCalled();
      expect(apiServiceStub.postData).toHaveBeenCalled();
      expect(apiServiceStub.updateData).toHaveBeenCalled();
    });
  });
});
