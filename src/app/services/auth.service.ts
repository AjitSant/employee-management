import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiSrv: ApiService) { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) return true;
    return false;
  }
}
