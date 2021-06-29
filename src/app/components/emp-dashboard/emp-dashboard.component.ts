import { ApiService } from 'src/app/services/api.service';
import { EmpInterface } from 'src/app/interfaces/app.model';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EmpFormComponent } from '../emp-form/emp-form.component';
import { SimpleModalComponent } from '../modal/simple-modal/simple-modal.component';

@Component({
  selector: 'api-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.scss']
})
export class EmpDashboardComponent implements OnDestroy {
  displayedColumns: string[] = ['id', 'fname', 'lname', 'email', 'mobile', 'salary', 'action'];
  dataSource!: MatTableDataSource<EmpInterface>;
  private sub = new Subject();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  delMsg = '';
  delClass = '';
  constructor(private apiSrv: ApiService, private dialog: MatDialog) {
    this.getEmpData();
  }
  getEmpData() {
    this.apiSrv.getEmpData().pipe(takeUntil(this.sub)).subscribe(res => {
      const response = (res as EmpInterface[]).map((val) => {
        const action = {
          edit: "Edit",
          delete: "Delete"
        }
        const value = { ...val, action };
        return value;
      });
      this.dataSource = new MatTableDataSource(response as EmpInterface[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  deleteEmpForm(empId: number) {
    this.apiSrv.deleteData(empId).pipe(takeUntil(this.sub)).subscribe({
      next: res => {
        this.delMsg = 'Record Deleted Successfully!!';
        this.delClass = 'alert-success';
        this.getEmpData();
      },
      error: error => {
        this.delMsg = 'Record Deletion Failed!!';
        this.delClass = 'alert-warning';
      }
    })
  }

  openDialog(empData?: EmpInterface) {
    let dialogRef = empData ? this.dialog.open(SimpleModalComponent, { data: { empData }, height: '80%', width: '40%' }) : this.dialog.open(SimpleModalComponent, { data: {}, height: '80%', width: '40%' });
    dialogRef.componentInstance.component = EmpFormComponent;
    dialogRef.componentInstance.apiSuccessEvent.pipe(takeUntil(this.sub)).subscribe((res) => {
      if (res) {
        this.getEmpData();
      }
    })
  }

  addEmp() {
    this.openDialog();
  }

  editEmpForm(empData: EmpInterface) {
    this.openDialog(empData);
  }

  applyFilter(event: any) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
