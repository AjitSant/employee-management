import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { EmpDashboardComponent } from './components/emp-dashboard/emp-dashboard.component';
import { EmpFormComponent } from './components/emp-form/emp-form.component';
import { LoginComponent } from './components/login/login.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthenticateUserGuard } from './guards/authenticate-user.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'mainDashboard', component: MainDashboardComponent, canActivate: [AuthenticateUserGuard] },
  { path: 'empDashboard', component: EmpDashboardComponent, canActivate: [AuthenticateUserGuard] },
  { path: 'empForm', component: EmpFormComponent, canActivate: [AuthenticateUserGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent, canActivate: [AuthenticateUserGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthenticateUserGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
