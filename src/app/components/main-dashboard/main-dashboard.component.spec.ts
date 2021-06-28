import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { EmpInterface } from 'src/app/interfaces/app.model';
import { ApiService } from 'src/app/services/api.service';
import { FormsModule } from '@angular/forms';
import { MainDashboardComponent } from './main-dashboard.component';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

describe('MainDashboardComponent', () => {
  let component: MainDashboardComponent;
  let fixture: ComponentFixture<MainDashboardComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: (array: any) => ({}) });
    const apiServiceStub = () => ({
      getDashData: () => ({ pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }) }),
      deleteDashData: (empId: any) => ({ pipe: () => ({ subscribe: (f: (arg0: {}) => any) => f({}) }) })
    });
    TestBed.configureTestingModule({
      imports: [FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MainDashboardComponent,FilterPipe],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: ApiService, useFactory: apiServiceStub }
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

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getDashboardData').and.callThrough();
      component.ngOnInit();
      expect(component.getDashboardData).toHaveBeenCalled();
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
