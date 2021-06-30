import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errMsg = '';
  constructor(private fb: FormBuilder, private router: Router, private apiSrv: ApiService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
    });
  }

  onSubmit(e: any) {
    e.preventDefault();
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.apiSrv.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          if (res.accessToken) {
            localStorage.setItem('token', res.accessToken);
            this.router.navigate(['/mainDashboard']);
          }
        },
        error: (err) => {
          this.errMsg = err.error;
        }
      });
    }
  }
}
