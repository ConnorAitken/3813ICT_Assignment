import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

const BACKEND_URl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {

  constructor(private http:HttpClient) { }

  imgUpload(fd: any) {
    return this.http.post<any>(BACKEND_URl + '/upload_img', fd)
  }
}
