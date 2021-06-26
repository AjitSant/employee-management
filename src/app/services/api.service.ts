import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmpInterface } from '../interfaces/app.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private empUrl = 'http://localhost:3004/employee/';
  private dashboardUrl = 'http://localhost:3004/dashboard/';
  private headers: HttpHeaders = new HttpHeaders({"content-type": "json"});
  
  constructor(private http: HttpClient) { }

  getEmpData() {
    return this.http.get(this.empUrl);
  }
  updateData(body: EmpInterface,id:number){
    return this.http.put<any>(this.empUrl+id, body, {...this.headers});
  }

  postData(body: EmpInterface){
    return this.http.post<any>(this.empUrl, body, {...this.headers});
  }

  deleteData(id: number){
    return this.http.delete(this.empUrl+id);
  }

  getDashData() {
    return this.http.get(this.dashboardUrl);
  }
  updateDashData(body: EmpInterface,id:number){
    return this.http.put<any>(this.dashboardUrl+id, body, {...this.headers});
  }

  postDashData(body: EmpInterface){
    return this.http.post<any>(this.dashboardUrl, body, {...this.headers});
  }

  deleteDashData(id: number){
    return this.http.delete(this.dashboardUrl+id);
  }
}
