import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json' })
};

const BACKEND_URl = 'http://localhost:3000';

@Component({
  selector: 'app-group-assis',
  templateUrl: './group-assis.component.html',
  styleUrls: ['./group-assis.component.css']
})
export class GroupAssisComponent implements OnInit {
  data = {
    groupID:-1,
    groupName:"",
    roomID:-1,
    roomName:"",
    userName:""
  }

  groups: any;
  rooms: any;
  users: any;

  selectedGroup: any;
  selectedRoom: any;
  selectedUser: any;

  currentGroup: any;

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
  
  choose() {
    let i = this.groups.findIndex((group:any) =>
      (group.name == this.selectedGroup.name));
    this.currentGroup = this.groups[i];
    this.httpClient.post(BACKEND_URl + '/group_info', this.currentGroup, httpOptions).subscribe((data:any) => {
      this.rooms = data;
      this.httpClient.post(BACKEND_URl + '/load_group_users', this.currentGroup, httpOptions).subscribe((data:any) => {
        let temp = [];
        var check = true;
        for (let i = 0; i < data.length; i++) {
          for (let x = i+1; x < data.length; x++) {
            if (data[i].uname == data[x].uname) {
              check = false;
            }
          }
          if (check) {
            temp.push(data[i]);
          }
          check = true;
        }
        this.users = temp; 
      });
    });
  }

  create_channel() {
    this.data.groupID = this.currentGroup.id;
    this.httpClient.post(BACKEND_URl + '/create_room', this.data, httpOptions).subscribe((data:any) => {
      if (data.saved) {
        alert("Saved!!");
      }
      else {
        if (data.exists) alert("Channel Already Exists!!");
        else alert("Error Creating New Channel!!");
      }
    });
  }

  ivite_user() {
    this.data.groupID = this.currentGroup.id;
    this.data.groupName = this.currentGroup.name;
    this.data.roomName = this.selectedRoom.name;
    this.data.userName = this.selectedUser.uname;
    this.httpClient.post(BACKEND_URl + '/invite_user', this.data, httpOptions).subscribe((data:any) => {
      if (data.success) {
        alert("Invited!!");
      }
      else {
        if (data.exists) alert("User Already In Channel!!");
        else alert("Error Inviting!!");
      }
    });
  }

  remove_user() {
    this.data.groupID = this.currentGroup.id;
    this.data.groupName = this.currentGroup.name;
    this.data.roomName = this.selectedRoom.name;
    this.data.userName = this.selectedUser.uname;
    this.httpClient.post(BACKEND_URl + '/remove_user', this.data, httpOptions).subscribe((data:any) => {
      if (data.success) {
        alert("Removed!!");
      }
      else {
        if (!data.exists) alert("User Not Found In Channel!!");
        else alert("Error Removing!!");
      }
    });
  }
}
