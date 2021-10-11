import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json' })
};

const BACKEND_URl = 'http://localhost:3000';

@Component({
  selector: 'app-group-admin',
  templateUrl: './group-admin.component.html',
  styleUrls: ['./group-admin.component.css']
})
export class GroupAdminComponent implements OnInit {
  data = {
    _id:"",
    groupName:"",
  }

  groups: any;

  selectedGroup: any;

  constructor(private router:Router, private httpClient:HttpClient) {
    if (sessionStorage.getItem('id') == null) {
      alert("Not Logged In!!!");
      this.router.navigateByUrl('/');
    }
   }

  ngOnInit(): void {
    this.httpClient.post(BACKEND_URl + '/groups', "", httpOptions).subscribe((data:any) => {
      this.groups = data;
    });
  }

  return() {
    this.router.navigateByUrl('/home');
  }

  create_group() {
    this.httpClient.post(BACKEND_URl + '/create_group', this.data, httpOptions).subscribe((data:any) => {
      if (data.saved) {
        window.location.reload();
        alert("Group Created");
      }
      else {
        window.location.reload();
        alert("Group Already Exists or Error Occurred");
      }
    });
  }

  remove_group() {
    let i = this.groups.findIndex((group:any) =>
      (group.name == this.selectedGroup.name));
    if (i == -1) {
      console.log("Failed to find group");
    }
    else {
      this.data._id = this.groups[i]._id;
      this.httpClient.post(BACKEND_URl + '/remove_group', this.data, httpOptions).subscribe((data:any) => {
        if (data.removed) {
          window.location.reload();
          alert("Removed!!");
        }
        else {
          window.location.reload();
          alert("Error Removing!!");
        }
      });
    }
  }

  group_management() {
    this.router.navigateByUrl('/group-manage');
  }
}
