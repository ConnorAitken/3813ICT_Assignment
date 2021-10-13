import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { DatabaseService } from "../services/database.service";

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
    this.router.navigateByUrl('/home');
  }

  create_group() {
    this.database.create_group(this.data).subscribe((data:any) => {
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
      this.database.remove_group(this.data).subscribe((data:any) => {
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
