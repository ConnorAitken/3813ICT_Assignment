import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json' })
};

const BACKEND_URl = 'http://localhost:3000';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {
  data = {
    userName:"",
    email:"",
    role:""
  }

  newUserName = "";
  newEmail = "";
  selectedRole = "Role";

  upUserName = "";
  selectedUpgradedRole = "Role";

  constructor(private router:Router, private httpClient:HttpClient) {
    if (sessionStorage.getItem('id') == null) {
      alert("Not Logged In!!!");
      this.router.navigateByUrl('/login');
    }
   }

  ngOnInit(): void { }

  return() {
    this.router.navigateByUrl('/groups');
  }

  group_admin() {
    this.router.navigateByUrl('/group-admin');
  }

  test() {
    // alert(this.selectedUpgradedRole);
  }

  create_user() {
    this.data.userName = this.newUserName;
    this.data.email = this.newEmail;
    this.data.role = this.selectedRole;
    if (this.data.role == "Role") {
      alert("Please Select A Role!!");
    }
    else {
      this.httpClient.post(BACKEND_URl + '/create_user', this.data, httpOptions).subscribe((data:any) => {
        if (data.success) {
          alert("Added!!");
          this.newUserName = "";
          this.newEmail = "";
          this.selectedRole = "Role";
        }
        else {
          if (data.exists) alert("Username Already Exists!!");
          else alert("Error Creating New User!!");
        }
      });
    }
  }

  upgrade_user() {
    this.data.userName = this.upUserName;
    this.data.role = this.selectedUpgradedRole;
    if (this.data.role == "Role") {
      alert("Please Select A Role!!");
    }
    else {
      this.httpClient.post(BACKEND_URl + '/upgrade_user', this.data, httpOptions).subscribe((data:any) => {
        if (data.success) {
          alert("Upgraded!!");
          this.upUserName = "";
          this.selectedUpgradedRole = "Role";
        }
        else {
          if (data.exists) alert("User Already Super-Admin Or Group-Admin!!");
          else alert("Error Upgrading!!");
        }
      });
    }
  }
}
