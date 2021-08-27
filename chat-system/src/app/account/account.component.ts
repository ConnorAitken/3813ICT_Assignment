import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router'; 

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

    uname=sessionStorage.getItem('uname');
    email=sessionStorage.getItem('email');
    role=sessionStorage.getItem('role');
    constructor( private route:ActivatedRoute, private router:Router ) { }

    ngOnInit() {
        if (this.uname == null) {
            this.uname="John";
            this.email="JohnDoe@gmail.com";
            this.role="User";
        }
    }

    return() {
        this.router.navigateByUrl('/login');
    }

    edit() {
        this.router.navigateByUrl('/profile');
    }
}