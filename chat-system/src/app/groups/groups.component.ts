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
  constructor( private router:Router, private httpClient:HttpClient ) { }

  ngOnInit(): void {
    this.httpClient.post(BACKEND_URl + '/groups', "", httpOptions).subscribe((data:any) => {
      this.groups = data;
      this.selectedGroup = this.groups[0];
      alert(this.selectedGroup.name);
    });
  }

  onSelect(group: any): void {
    this.selectedGroup = group;
    alert(this.selectedGroup.name);
  }

}
