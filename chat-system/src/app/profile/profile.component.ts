import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json' })
};

const BACKEND_URl = 'http://localhost:3000';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {
    id:sessionStorage.getItem('id'),
    uname:sessionStorage.getItem('uname'),
    email:sessionStorage.getItem('email'),
    role:sessionStorage.getItem('role'),
    valid:false
  }

  constructor(private router:Router, private httpClient:HttpClient) {
    if (sessionStorage.getItem('id') == null) {
      alert("Not Logged In!!!");
      this.router.navigateByUrl('/login');
    }
   }

  ngOnInit(): void {
  }

  return() {
    this.router.navigateByUrl('/account');
  }

  save() {
    this.httpClient.post(BACKEND_URl + '/edit', this.user, httpOptions).subscribe((data:any) => {
      if (data.saved) {
        sessionStorage.setItem('id', this.user.id!);
        sessionStorage.setItem('uname', this.user.uname!);
        sessionStorage.setItem('email', this.user.email!);
        sessionStorage.setItem('role', this.user.role!);
        this.router.navigateByUrl('/account');
      }
      else {
        alert("Error Saving!!");
      }
    });
  }

}
