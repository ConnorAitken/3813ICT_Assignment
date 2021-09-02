import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json' })
};

const BACKEND_URl = 'http://localhost:3000';

@Component({
  selector: 'app-groups-management',
  templateUrl: './groups-management.component.html',
  styleUrls: ['./groups-management.component.css']
})
export class GroupsManagementComponent implements OnInit {
  data = {
    id:"",
    userName:"",
    channelName:"",
    role:"",
    valid:false
  }

  constructor(private router:Router, private httpClient:HttpClient) {
    if (sessionStorage.getItem('id') == null) {
      alert("Not Logged In!!!");
      this.router.navigateByUrl('/login');
    }
   }

  ngOnInit(): void {
    this.httpClient.post(BACKEND_URl + '/groups', "", httpOptions).subscribe((data:any) => {
      // alert(data[1]);
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        var completelist = document.getElementById("group_select")!;
        completelist.innerHTML += "<option value='" + (i+1) + "'>" + data[i].name + "</option>";
      } 
    });
  }

  return() {
    this.router.navigateByUrl('/group-admin');
  }
  
  choose() {

  }

  create_channel() {
    
  }

  remove_channel() {
    
  }

  ivite_user() {
    
  }

  remove_user() {
    
  }

  upgrade_user() {
    
  }


  save() {
    // this.httpClient.post(BACKEND_URl + '/edit', this.user, httpOptions).subscribe((data:any) => {
    //   if (data.saved) {
    //     sessionStorage.setItem('id', this.user.id!);
    //     sessionStorage.setItem('uname', this.user.uname!);
    //     sessionStorage.setItem('email', this.user.email!);
    //     sessionStorage.setItem('role', this.user.role!);
    //     this.router.navigateByUrl('/account');
    //   }
    //   else {
    //     alert("Error Saving!!");
    //   }
    // });
  }
}
