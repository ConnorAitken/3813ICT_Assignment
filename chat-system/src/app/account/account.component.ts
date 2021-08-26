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
    bdate=sessionStorage.getItem('bdate');
    age=sessionStorage.getItem('age');
    email=sessionStorage.getItem('email');
    upwd=sessionStorage.getItem('upwd');
    constructor( private route:ActivatedRoute, private router:Router ) { }

    ngOnInit() {
        if (this.uname == null) {
            this.uname="John";
            this.bdate="01/01/1999";
            this.age="22";
            this.email="JohnDoe@gmail.com";
            this.upwd="Password"
        }
    }

    return() {
        this.router.navigateByUrl('/login');
    }

    edit() {
        this.router.navigateByUrl('/profile');
    }
}