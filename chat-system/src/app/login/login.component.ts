import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router'; 
import { DatabaseService } from "../services/database.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    user = {uname: '', password: '', valid: false};
    toggleClass: boolean = true;
    constructor( private router:Router, private database:DatabaseService ) { }

    ngOnInit(): void {
    }
    public loginfunc() {
        this.database.login(this.user).subscribe((data:any) => {
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
                this.user.uname = "";
                this.user.password = "";
                this.user.valid = false;
            }
        });
    }
}