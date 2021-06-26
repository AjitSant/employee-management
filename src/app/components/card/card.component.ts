import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmpInterface } from 'src/app/interfaces/app.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() editEvent = new EventEmitter<any>();
  @Input()
  config!: EmpInterface;
  constructor() { }

  ngOnInit(): void {
  }

  deleteHandler(id:number){
    this.deleteEvent.emit(id);
  }

  editHandler(empData:EmpInterface){
    this.editEvent.emit(empData);
  }

}
