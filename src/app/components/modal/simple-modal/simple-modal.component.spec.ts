import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, EventEmitter } from '@angular/core';
import { SimpleModalComponent } from './simple-modal.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('SimpleModalComponent', () => {
  let component: SimpleModalComponent;
  let fixture: ComponentFixture<SimpleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SimpleModalComponent]
    });
    fixture = TestBed.createComponent(SimpleModalComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call properly', () => {
      spyOn((component as any).componentFactoryResolver,'resolveComponentFactory').and.returnValue({});
      spyOn((component as any).viewContainerRef,'clear');
      const res = {
        instance: {
          data: {},
          apiSuccess: new EventEmitter()
        }
      };
      spyOn((component as any).viewContainerRef, 'createComponent').and.returnValue(res);
      spyOn(component,'handleSuccessApi');
       component.ngOnInit();
      expect((component as any).viewContainerRef.clear).toHaveBeenCalled();
    })
  });

  describe('handleSuccessApi', () => {
    it('should call properly', () => {
      spyOn(component.apiSuccessEvent, 'emit');
      component.handleSuccessApi(false);
      expect(component.apiSuccessEvent.emit).toHaveBeenCalled();
    })
  });
});
