import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EmpInterface } from 'src/app/interfaces/app.model';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CardComponent]
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('deleteHandler', () => {
    it('should call properly', () => {
      spyOn(component.deleteEvent, 'emit');
      component.deleteHandler(1);
      expect(component.deleteEvent.emit).toHaveBeenCalled();
    })
  });

  describe('editHandler', () => {
    it('should call properly', () => {
      const empData = {
        id: 1,
        fname: 'Ajit',
        lname: 'Kr',
        email: 'ajit@test.com',
        mobile: 9812981450,
        salary: 50000
      }
      spyOn(component.editEvent, 'emit');
      component.editHandler(empData);
      expect(component.editEvent.emit).toHaveBeenCalled();
    })
  });
});
