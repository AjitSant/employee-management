import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SimpleModalComponent } from './simple-modal.component';

describe('SimpleModalComponent', () => {
  let component: SimpleModalComponent;
  let fixture: ComponentFixture<SimpleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SimpleModalComponent]
    });
    fixture = TestBed.createComponent(SimpleModalComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
