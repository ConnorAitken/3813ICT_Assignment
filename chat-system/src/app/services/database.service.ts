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
    return this.http.post<any>(BACKEND_URl + '/create_user', data, httpOptions);
  }
  upgrade_user(data:any) {
    return this.http.post<any>(BACKEND_URl + '/upgrade_user', data, httpOptions);
  }
  get_groups() {
    return this.http.post<any>(BACKEND_URl + '/groups', "", httpOptions);
  }
  get_group_info(currentGroup:any) {
    return this.http.post<any>(BACKEND_URl + '/group_info', currentGroup, httpOptions);
  }
  create_group(data:any) {
    return this.http.post<any>(BACKEND_URl + '/create_group', data, httpOptions);
  }
  remove_group(data:any){
    return this.http.post<any>(BACKEND_URl + '/remove_group', data, httpOptions);
  }
  create_room(data:any) {
    return this.http.post<any>(BACKEND_URl + '/create_room', data, httpOptions);
  }
  remove_room(data:any){
    return this.http.post<any>(BACKEND_URl + '/remove_room', data, httpOptions);
  }
  invite_user(data:any){
    return this.http.post<any>(BACKEND_URl + '/invite_user', data, httpOptions);
  }
  remove_user(data:any){
    return this.http.post<any>(BACKEND_URl + '/remove_user', data, httpOptions);
  }
  upgrade_to_ass(data:any){
    return this.http.post<any>(BACKEND_URl + '/upgrade_to_ass', data, httpOptions);
  }
  save_chat(data:any){
    return this.http.post<any>(BACKEND_URl + '/save_chat', data, httpOptions);
  }
  load_group_users(data:any){
    return this.http.post<any>(BACKEND_URl + '/load_group_users', data, httpOptions);
  }
  load_chat(data:any){
    return this.http.post<any>(BACKEND_URl + '/load_chat', data, httpOptions);
  }
}
