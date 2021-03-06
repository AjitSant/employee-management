import { Component, OnInit, Inject, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DialogData, EmpInterface } from 'src/app/interfaces/app.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.scss']
})
export class EmpFormComponent implements OnInit, OnDestroy {
  empForm: FormGroup;
  submitName = "Add";
  submitMsg = '';
  submitClass = '';
  private sub = new Subject();
  private editData!: EmpInterface;
  @Input()
  data!: DialogData;
  @Output() apiSuccess = new EventEmitter<any>();
  dashCall = false;

  constructor(private fb: FormBuilder, private apiSrv: ApiService, private router: Router) {
    this.empForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      salary: ['', [Validators.required, Validators.pattern("^[0-9]{5,}$")]]
    });
  }
  ngOnInit(): void {
    if (!this.data) {
      this.dashCall = true;
    }
    this.editData = (history.state && history.state.empData) || (this.data && this.data.empData);
    if (this.editData) {
      this.makeEditEntry(this.editData);
    }
  }
  makeEditEntry(data: EmpInterface) {
    this.submitName = "Update";
    this.empForm.patchValue({
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      mobile: data.mobile,
      salary: data.salary
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  resetEmpForm() {
    this.empForm.patchValue({
      fname: '',
      lname: '',
      email: '',
      mobile: '',
      salary: ''
    })
  }

  onSubmit() {
    this.empForm.markAllAsTouched();
    if (this.empForm.valid) {
      if (this.dashCall) {
        if (this.submitName === "Add") {
          this.apiSrv.postDashData(this.empForm.value).pipe(takeUntil(this.sub)).subscribe({
            next: res => {
              this.handleSuccess('Added');
              this.router.navigate(["/mainDashboard"]);
            },
            error: error => {
              this.handleErr('Addition');
            }
          })
        } else if (this.submitName === "Update") {
          this.apiSrv.updateDashData(this.empForm.value, this.editData.id).pipe(takeUntil(this.sub)).subscribe({
            next: res => {
              this.handleSuccess('Updated');
              this.router.navigate(["/mainDashboard"]);
            },
            error: error => {
              this.handleErr('Updation');
            }
          })
        }
      }
      else {
        if (this.submitName === "Add") {
          this.apiSrv.postData(this.empForm.value).pipe(takeUntil(this.sub)).subscribe({
            next: res => {
              this.handleSuccess('Added');
            },
            error: error => {
              this.handleErr('Addition');
            }
          })
        } else if (this.submitName === "Update") {
          this.apiSrv.updateData(this.empForm.value, this.editData.id).pipe(takeUntil(this.sub)).subscribe({
            next: res => {
              this.handleSuccess('Updated');
            },
            error: error => {
              this.handleErr('Updation');
            }
          })
        }
      }
    }
  }
  handleErr(msg: string) {
    this.submitMsg = `Record ${msg} Failed!!`;
    this.submitClass = 'alert-warning';
  }
  handleSuccess(msg: string) {
    this.submitMsg = `Record ${msg} Successfully!!`;
    this.submitClass = 'alert-success';
    this.apiSuccess.emit(true);
  }
}
