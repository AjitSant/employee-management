import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmpInterface } from '../interfaces/app.model';
import { dashboardUrl, empUrl, loginUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers: HttpHeaders = new HttpHeaders({ "content-type": "json" });

  constructor(private http: HttpClient) { }

  getEmpData() {
    return this.http.get(empUrl);
  }
  updateData(body: EmpInterface, id: number) {
    return this.http.put<any>(empUrl + id, body, { ...this.headers });
  }

  postData(body: EmpInterface) {
    return this.http.post<any>(empUrl, body, { ...this.headers });
  }

  deleteData(id: number) {
    return this.http.delete(empUrl + id);
  }

  getDashData() {
    return this.http.get(dashboardUrl);
  }
  updateDashData(body: EmpInterface, id: number) {
    return this.http.put<any>(dashboardUrl + id, body, { ...this.headers });
  }

  postDashData(body: EmpInterface) {
    return this.http.post<any>(dashboardUrl, body, { ...this.headers });
  }

  deleteDashData(id: number) {
    return this.http.delete(dashboardUrl + id);
  }

  login(data: any) {
    return this.http.post(loginUrl, data);
  }
}
