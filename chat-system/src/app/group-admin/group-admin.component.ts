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
    id:-1,
    channelName:"",
    groupName:"",
    valid:false
  }

  groups: any;

  selectedGroup: any;

  constructor(private router:Router, private httpClient:HttpClient) {
    if (sessionStorage.getItem('id') == null) {
      alert("Not Logged In!!!");
      this.router.navigateByUrl('/login');
    }
    // this.httpClient.post(BACKEND_URl + '/groups', "", httpOptions).subscribe((data:any) => {
    //   this.groups = data;
    // });
   }

  ngOnInit(): void {
    this.httpClient.post(BACKEND_URl + '/groups', "", httpOptions).subscribe((data:any) => {
      this.groups = data;
      // alert(data[1]);
      // console.log(data);
      // for (let i = 0; i < data.length; i++) {
      //   console.log(data[i]);
      //   var completelist = document.getElementById("group_select")!;
      //   completelist.innerHTML += "<option value='" + (i+1) + "'>" + data[i].name + "</option>";
      // } 
    });
  }

  return() {
    this.router.navigateByUrl('/account');
  }

  create_group() {
    this.httpClient.post(BACKEND_URl + '/create_group', this.data, httpOptions).subscribe((data:any) => {
      if (data.saved) {
        // sessionStorage.setItem('id', this.user.id!);
        // sessionStorage.setItem('uname', this.user.uname!);
        // sessionStorage.setItem('email', this.user.email!);
        // sessionStorage.setItem('role', this.user.role!);
        // this.router.navigateByUrl('/account');
        window.location.reload();
        alert("Saved!!");
      }
      else {
        window.location.reload();
        alert("Error Saving!!");
      }
    });
  }

  remove_group() {
    this.data.groupName = this.selectedGroup.name;
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
    // window.location.reload();
  }

  group_management() {
    this.router.navigateByUrl('/group-manage');
  }
}
