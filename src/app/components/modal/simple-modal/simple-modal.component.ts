import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/app.model';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent implements OnInit {
  @Output() apiSuccessEvent = new EventEmitter<any>();

  constructor( @Inject(MAT_DIALOG_DATA) public empData: DialogData) { }

  ngOnInit(): void {
  }

  handleSuccessApi(event:boolean){
this.apiSuccessEvent.emit(event);
  }

}
