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
    customer = {uname: '', password: '', valid: false};
    toggleClass: boolean = true;
    constructor( private router:Router, private httpClient:HttpClient ) { }

    ngOnInit(): void {
    }
    public loginfunc() {
        this.httpClient.post(BACKEND_URl + '/api/auth', this.customer, httpOptions).subscribe((data:any) => {
            if (data.valid) {
                sessionStorage.setItem('id', data.id);
                sessionStorage.setItem('uname', data.uname);
                sessionStorage.setItem('email', data.email);
                sessionStorage.setItem('role', data.role);
                this.toggleClass = true;
                this.router.navigateByUrl('/home');
            }
            else {
                this.toggleClass = false;
                this.customer.uname = "";
                this.customer.password = "";
                this.customer.valid = false;
            }
        });
    }
}