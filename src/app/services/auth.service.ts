import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiSrv: ApiService) { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if(token) return true;
    // this.apiSrv.verifyToken(token).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     return true;
    //   },
    //   error: (err) => { console.log(`error ${err}`); return false; }
    // }
    // )
    return false;
  }
}
