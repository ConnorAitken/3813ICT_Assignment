import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json' })
};

const BACKEND_URl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http:HttpClient) { }
  login(user:any) {
    return this.http.post<any>(BACKEND_URl + '/api/auth', user, httpOptions);
  }
  create_user(data:any) {
    return this.http.post<any>(BACKEND_URl + '/api/create_user', data, httpOptions);
  }
  upgrade_user(data:any) {
    return this.http.post<any>(BACKEND_URl + '/api/upgrade_user', data, httpOptions);
  }
  get_groups() {
    return this.http.post<any>(BACKEND_URl + '/api/groups', httpOptions);
  }
  get_group_info(currentGroup:any) {
    return this.http.post<any>(BACKEND_URl + '/api/group_info', currentGroup, httpOptions);
  }
  create_group(data:any) {
    return this.http.post<any>(BACKEND_URl + '/api/create_group', data, httpOptions);
  }
  remove_group(data:any){
    return this.http.post<any>(BACKEND_URl + '/api/remove_group', data, httpOptions);
  }
  create_room(data:any) {
    return this.http.post<any>(BACKEND_URl + '/api/create_room', data, httpOptions);
  }
  remove_room(data:any){
    return this.http.post<any>(BACKEND_URl + '/api/remove_room', data, httpOptions);
  }
  invite_user(data:any){
    return this.http.post<any>(BACKEND_URl + '/api/invite_user', data, httpOptions);
  }
  remove_user(data:any){
    return this.http.post<any>(BACKEND_URl + '/api/remove_user', data, httpOptions);
  }
  upgrade_to_ass(data:any){
    return this.http.post<any>(BACKEND_URl + '/api/upgrade_to_ass', data, httpOptions);
  }
  save_chat(data:any){
    return this.http.post<any>(BACKEND_URl + '/api/save_chat', data, httpOptions);
  }
  load_group_users(data:any){
    return this.http.post<any>(BACKEND_URl + '/api/load_group_users', data, httpOptions);
  }
  load_chat(data:any){
    return this.http.post<any>(BACKEND_URl + '/api/load_chat', data, httpOptions);
  }
}
