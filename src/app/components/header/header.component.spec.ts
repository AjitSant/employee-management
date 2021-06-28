import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    //const routerStub = () => ({ navigate: (array: any) => ({}) });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HeaderComponent],
      providers: [Router]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('logoutUser', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.logoutUser();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
