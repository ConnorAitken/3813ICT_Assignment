import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-system';
  role=sessionStorage.getItem('role');
  constructor(private router:Router) { }

  ngOnInit(){


  }

  logOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }
}
