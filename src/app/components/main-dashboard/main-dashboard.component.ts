import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmpInterface } from 'src/app/interfaces/app.model';
import { ApiService } from 'src/app/services/api.service';

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
  constructor(private apiSrv: ApiService, private router: Router) {}

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

  deleteDashboardData(empId: number) {
    console.log(empId);
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
