import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { DatabaseService } from "../services/database.service";

@Component({
  selector: 'app-groups-management',
  templateUrl: './groups-management.component.html',
  styleUrls: ['./groups-management.component.css']
})
export class GroupsManagementComponent implements OnInit {
  data = {
    groupID:-1,
    groupName:"",
    roomID:-1,
    roomName:"",
    userName:""
  }

  newAss = "";

  groups: any;
  rooms: any;

  selectedGroup: any;
  selectedRooms: any;
  selectedRoomsUsers: any;

  currentGroup: any;

  constructor(private router:Router, private database:DatabaseService) {
    if (sessionStorage.getItem('id') == null) {
      alert("Not Logged In!!!");
      this.router.navigateByUrl('/');
    }
   }

  ngOnInit(): void {
    this.database.get_groups().subscribe((data:any) => {
      this.groups = data;
    });
  }

  return() {
    this.router.navigateByUrl('/group-admin');
  }
  
  choose() {
    let i = this.groups.findIndex((group:any) =>
      (group.name == this.selectedGroup.name));
    this.currentGroup = this.groups[i];
    this.database.get_group_info(this.currentGroup).subscribe((data:any) => {
      this.rooms = data;
    });
  }

  create_channel() {
    this.data.groupID = this.currentGroup.id;
    this.database.create_room(this.data).subscribe((data:any) => {
      if (data.saved) {
        alert("Saved!!");
      }
      else {
        if (data.exists) alert("Channel Already Exists!!");
        else alert("Error Creating New Channel!!");
      }
    });
  }

  remove_channel() {
    this.data.groupID = this.currentGroup.id;
    this.data.groupName = this.currentGroup.name;
    this.data.roomName = this.selectedRooms.name;
    this.database.remove_room(this.data).subscribe((data:any) => {
      if (data.removed) {
        alert("Removed!!");
      }
      else {
        alert("Error Removing!!");
      }
    });
  }

  ivite_user() {
    this.data.groupID = this.currentGroup.id;
    this.data.groupName = this.currentGroup.name;
    this.data.roomName = this.selectedRoomsUsers.name;
    this.data.roomID = this.selectedRoomsUsers.roomID;
    this.database.invite_user(this.data).subscribe((data:any) => {
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
    this.data.roomName = this.selectedRoomsUsers.name;
    this.data.roomID = this.selectedRoomsUsers.roomID;
    this.database.remove_user(this.data).subscribe((data:any) => {
      if (data.success) {
        alert("Removed!!");
      }
      else {
        if (!data.exists) alert("User Not Found In Channel!!");
        else alert("Error Removing!!");
      }
    });
  }

  upgrade_user() {
    this.database.upgrade_to_ass({"userName":this.newAss, "groupName":this.currentGroup.name}).subscribe((data:any) => {
      if (data.success) {
        alert("Upgraded!!");
      }
      else {
        if (!data.exists) alert("User Not Found In Channel!!");
        else alert("Error Upgrading!!");
      }
    });
  }
}
