import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router'; 
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json' })
};

const BACKEND_URl = 'http://localhost:3000';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    customer = {email: '', upwd: '', valid: false};
    toggleClass: boolean = true;
    constructor( private router:Router, private httpClient:HttpClient ) { }

    ngOnInit(): void {
    }
    public loginfunc() {
        this.httpClient.post(BACKEND_URl + '/api/auth', this.customer, httpOptions).subscribe((data:any) => {
            if (data.valid) {
                sessionStorage.setItem('id', data.id);
                sessionStorage.setItem('uname', data.uname);
                sessionStorage.setItem('bdate', data.bdate);
                sessionStorage.setItem('age', data.age);
                sessionStorage.setItem('email', data.email);
                this.toggleClass = true;
                this.router.navigateByUrl('/account');
            }
            else {
                this.toggleClass = false;
                this.customer.email = "";
                this.customer.upwd = "";
            }
        });
    }
}