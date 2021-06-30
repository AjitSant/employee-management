import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {
  @Output() apiSuccess = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  proceedDelete(){
    this.apiSuccess.emit(true);
  }

}
