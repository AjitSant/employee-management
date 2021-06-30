import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoginComponent } from './login.component';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: (object: any) => ({}) });
    const routerStub = () => ({ navigate: (array: any) => ({}) });
    const apiServiceStub = () => ({
      login: (value: any) => ({ subscribe: (f: (arg0: {}) => any) => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: Router, useFactory: routerStub },
        { provide: ApiService, useFactory: apiServiceStub }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('returns true for token', () => {
     component.loginForm = new FormGroup({
       email: new FormControl('ajit@gmail.com', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
       password: new FormControl('ajit', Validators.required)
     })
      const apiServiceStub: ApiService = fixture.debugElement.injector.get(
        ApiService
      );
      const res = { accessToken:'token'};
      spyOn(apiServiceStub,'login').and.returnValue(of(res));
      spyOn((component as any).router,'navigate');
      component.onSubmit({preventDefault:()=>{}});
      expect(component.loginForm.valid).toBeTruthy();
    })
  });
});
