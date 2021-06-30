import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmpInterface } from 'src/app/interfaces/app.model';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { SimpleModalComponent } from '../modal/simple-modal/simple-modal.component';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
})
export class MainDashboardComponent implements OnInit, OnDestroy {
  private sub = new Subject();
  dashData: Array<EmpInterface> = [];
  delMsg = '';
  delClass = '';
  searchTxt: any;
  constructor(private apiSrv: ApiService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getDashboardData();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getDashboardData() {
    this.apiSrv
      .getDashData()
      .pipe(takeUntil(this.sub))
      .subscribe((res) => {
        this.dashData = res as EmpInterface[];
      });
  }

  addRecord() {
    this.router.navigate(['/empForm']);
  }

  editDashboardData(empData: EmpInterface) {
    this.router.navigate(['/empForm'], { state: { empData } });
  }

  confirmDelete(empId: number){
    let dialogRef = this.dialog.open(SimpleModalComponent);
    dialogRef.componentInstance.component = ConfirmDeleteComponent;
    dialogRef.componentInstance.apiSuccessEvent.pipe(takeUntil(this.sub)).subscribe((res) => {
      if (res) {
        this.deleteDashboardData(empId);
      }
    })
  }

  deleteDashboardData(empId: number) {
    this.apiSrv
      .deleteDashData(empId)
      .pipe(takeUntil(this.sub))
      .subscribe({
        next: (res) => {
          this.delMsg = 'Record Deleted Successfully!!';
          this.delClass = 'alert-success';
          this.getDashboardData();
        },
        error: (error) => {
          this.delMsg = 'Record Deletion Failed!!';
          this.delClass = 'alert-warning';
        },
      });
  }
}
