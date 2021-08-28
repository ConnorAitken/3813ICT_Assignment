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

  constructor( private router:Router, private httpClient:HttpClient ) { }

  ngOnInit(): void {
    this.httpClient.post(BACKEND_URl + '/groups', "", httpOptions).subscribe((data:any) => {
      // alert(data[1]);
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        var completelist = document.getElementById("group-list")!;
        completelist.innerHTML += "<li><a href='#chat_room.html'><i class='fa fa-rocket'></i><span>" + data[i].name + "</span><i class='fa fa-times pull-right'></i></a></li>";
      } 
    });
  }

}
