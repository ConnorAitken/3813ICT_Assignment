import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router'; 
import { DatabaseService } from "../services/database.service";

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

  selectedRoom: any;
  selectedUser: any;


  constructor(private router:Router, private database:DatabaseService, private route: ActivatedRoute) {
    if (sessionStorage.getItem('id') == null) {
      alert("Not Logged In!!!");
      this.router.navigateByUrl('/');
    }
   }

  ngOnInit(): void {
    this.data.groupID = Number(this.route.snapshot.params.groupID);
    this.data.groupName = this.route.snapshot.params.groupName;
    console.log(this.data.groupID);
    this.database.get_group_info({"id":this.data.groupID}).subscribe((data:any) => {
      this.rooms = data;
      this.database.load_group_users({"name":this.data.groupName}).subscribe((data:any) => {
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

  return() {
    this.router.navigateByUrl('/home');
  }

  create_channel() {
    this.database.create_room(this.data).subscribe((data:any) => {
      if (data.saved) {
        alert("Saved!!");
        window.location.reload();
      }
      else {
        if (data.exists) alert("Channel Already Exists!!");
        else alert("Error Creating New Channel!!");
      }
    });
  }

  ivite_user() {
    this.data.roomName = this.selectedRoom.name;
    this.data.roomID = this.selectedRoom.roomID;
    this.data.userName = this.selectedUser.uname;
    this.database.invite_user(this.data).subscribe((data:any) => {
      if (data.success) {
        alert("Invited!!");
        window.location.reload();
      }
      else {
        if (data.exists) alert("User Already In Channel!!");
        else alert("Error Inviting!!");
      }
    });
  }

  remove_user() {
    this.data.roomName = this.selectedRoom.name;
    this.data.roomID = this.selectedRoom.roomID;
    this.data.userName = this.selectedUser.uname;
    this.database.remove_user(this.data).subscribe((data:any) => {
      if (data.success) {
        alert("Removed!!");
        window.location.reload();
      }
      else {
        if (!data.exists) alert("User Not Found In Channel!!");
        else alert("Error Removing!!");
      }
    });
  }
}
