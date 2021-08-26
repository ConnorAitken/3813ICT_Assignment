import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router'; 

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    users = [{'email':'usr1@gmail.com','pwd':'123'},{'email':'usr2@gmail.com','pwd':'456'},{'email':'usr3@gmail.com','pwd':'789'}]
    customer = {email: '', upwd: '', valid: false};
    toggleClass: boolean = true;
    constructor( private router:Router ) { }

    ngOnInit(): void {
    }

    verifyUsr() {
        this.customer.valid = false;
        for (let i = 0; i < this.users.length; i++) {
            if (this.customer.email == this.users[i].email && this.customer.upwd == this.users[i].pwd) {
                this.customer.valid = true;
            } 
        }
        if (this.customer.valid == true) {
            this.toggleClass = true;
            this.router.navigateByUrl('/account/'+this.customer.email+'/'+this.customer.upwd);
        }
        else {
            this.toggleClass = false;
            this.customer.email = "";
            this.customer.upwd = "";
        }
    }
}