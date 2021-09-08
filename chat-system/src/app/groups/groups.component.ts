import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json' })
};

const BACKEND_URl = 'http://localhost:3000';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: any;
  selectedGroup: any;

  rooms: any;
  selectedRoom: any;

  users: any;

  toggleClass: boolean = false;
  toggleRole: boolean = false;

  Header: any;

  userRole;
  userID;
  userName;

  constructor( private router:Router, private httpClient:HttpClient ) {
    if (sessionStorage.getItem('id') == null) {
      alert("Not Logged In!!!");
      this.router.navigateByUrl('/');
    }
    this.userID = sessionStorage.getItem('id');
    this.userName = sessionStorage.getItem('uname');
    this.userRole = sessionStorage.getItem('role');
    if (this.userRole == "stdUser") {
      this.toggleRole = true;
    }
   }

  ngOnInit(): void {
    if (this.userRole == "SuperAdmin") {
      this.loadSuper();
    }
    else {
      this.loadEveryoneElse();
    }
  }

  loadSuper() {
    this.httpClient.post(BACKEND_URl + '/groups', "", httpOptions).subscribe((data:any) => {
      this.groups = data;
      this.onSelectGroup(data[0]);
    });
  }

  loadEveryoneElse() {
    this.httpClient.post(BACKEND_URl + '/groups', "", httpOptions).subscribe((groupData:any) => {
      let temp: any[] = [];
    var found = false;
    for (let i = 0; i < groupData.length; i++) {
      this.httpClient.post(BACKEND_URl + '/load_group_users', groupData[i], httpOptions).subscribe((userData:any) => {
        let x = userData.findIndex((user: { userID: any | null; }) =>
          (user.userID == this.userID));
        if (x != -1) {
          temp.push(groupData[i]);
          if (!found) {
            found = true;
            this.onSelectGroup(groupData[i])
          }
        }
      });
    }
    this.groups = temp
    });
  }

  groupsToggle() {
    this.toggleClass = !this.toggleClass;
  }

  onSelectGroup(group: any): void {
    this.selectedGroup = group;
    this.Header = this.selectedGroup.name;
    this.httpClient.post(BACKEND_URl + '/group_info', this.selectedGroup, httpOptions).subscribe((data:any) => {
      this.rooms = data;
      this.httpClient.post(BACKEND_URl + '/load_group_users', this.selectedGroup, httpOptions).subscribe((data:any) => {
        this.users = data; 
      });
    });
  }

  onSelectRoom(room: any): void{
    this.selectedRoom = room;
    this.Header = this.selectedGroup.name +" - "+ this.selectedRoom.name;
  }

  roleOptions() {
    if (this.userRole == "SuperAdmin") this.router.navigateByUrl('/super-admin');
    else if (this.userRole == "GroupAdmin") this.router.navigateByUrl('/group-admin');
    else this.router.navigateByUrl('/group-assis');
  }
}
