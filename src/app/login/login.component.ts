import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private model: any = {};
  private invalid: boolean = false;
  constructor(private router: Router, public layout: LayoutService) {
  }

  ngOnInit() {
    console.log("Build Version :1.0.16"+new Date());
    this.layout.hide();
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.id) {
      // window.console.log(currentUser);
      this.layout.loggedin(true);
      this.router.navigate(['/home']);
    }

  }

  login(form) {

    //if (form.pass === "Admin" && form.name === "Admin") {
      //form.loggedin = true;
      // this.layout.expand = true;
      this.layout.signin(form)
      .subscribe(
        data => {
          // console.log(data);
          this.router.navigate(['/home']);
        },
        error => {     
            let err = JSON.parse(error);
            if(err.error.statusCode === 401){
              this.invalid =true;
              setTimeout(function() {
                this.invalid = false;
                // console.log(this.hidetime);
                }.bind(this),4000);

            }
            
        });
    // }
    // else {
    //   this.invalid = true;
    // }
  }
}


