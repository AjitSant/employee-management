import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { EncrDecrService } from 'src/app/services/encr-decr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errMsg = '';
  constructor(private fb: FormBuilder,
    private router: Router,
    private apiSrv: ApiService,
    private EncrDecr: EncrDecrService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
    });
  }

  onSubmit(e: any) {
    e.preventDefault();
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.EncrDecr.set('123456$#@$^@1ERF', this.loginForm.value.password);
      this.apiSrv.login({email,password}).subscribe({
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
