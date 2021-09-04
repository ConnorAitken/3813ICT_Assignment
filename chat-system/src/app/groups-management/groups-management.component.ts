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
    groupID:-1,
    roomID:-1,
    roomName:"",
    userName:""
  }

  // room = {
  //   groupID:-1,
  //   roomID:-1,
  //   name:""
  // }

  groups: any;
  rooms: any;

  selectedGroup: any;
  selectedRooms: any;
  selectedRoomsUsers: any;

  currentGroup: any;

  constructor(private router:Router, private httpClient:HttpClient) {
    if (sessionStorage.getItem('id') == null) {
      alert("Not Logged In!!!");
      this.router.navigateByUrl('/login');
    }
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
    this.router.navigateByUrl('/group-admin');
  }
  
  choose() {
    let i = this.groups.findIndex((group:any) =>
      (group.name == this.selectedGroup.name));
    this.currentGroup = this.groups[i];
    this.httpClient.post(BACKEND_URl + '/group_info', this.currentGroup, httpOptions).subscribe((data:any) => {
      this.rooms = data;
      alert("Rooms Loaded");
      // if (data.removed) {
      //   window.location.reload();
      //   alert("Removed!!");
      // }
      // else {
      //   window.location.reload();
      //   alert("Error Removing!!");
      // }
    });
  }

  create_channel() {
    this.data.groupID = this.currentGroup.id;
    this.httpClient.post(BACKEND_URl + '/create_room', this.data, httpOptions).subscribe((data:any) => {
      if (data.saved) {
        window.location.reload();
        alert("Saved!!");
      }
      else {
        window.location.reload();
        alert("Error Saving!!");
      }
    });
  }

  remove_channel() {
    this.data.groupID = this.currentGroup.id;
    this.data.roomName = this.selectedRooms.name;
    this.httpClient.post(BACKEND_URl + '/remove_room', this.data, httpOptions).subscribe((data:any) => {
      if (data.saved) {
        window.location.reload();
        alert("Saved!!");
      }
      else {
        window.location.reload();
        alert("Error Saving!!");
      }
    });
  }

  ivite_user() {
    this.data.groupID = this.currentGroup.id;
    this.data.roomName = this.selectedRooms.name;
    this.httpClient.post(BACKEND_URl + '/remove_room', this.data, httpOptions).subscribe((data:any) => {
      if (data.saved) {
        window.location.reload();
        alert("Saved!!");
      }
      else {
        window.location.reload();
        alert("Error Saving!!");
      }
    });
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
