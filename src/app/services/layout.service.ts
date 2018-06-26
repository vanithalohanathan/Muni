import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable()
export class LayoutService {

  visible: boolean;
  //islogin: boolean;
  public isUserLggedIn;
  activeid: number ;
  hidewhenuser:boolean;
  // expand:boolean = true;


  constructor(private http: Http,private router: Router) {
    this.visible = false;
    this.hidewhenuser = true;
    this.isUserLggedIn = false;
    this.activeid = 1;

  }

  
  activeidchange(id) {
    this.activeid = id;
    
  }
  
  loggedin(val) {
    this.isUserLggedIn = val;
  }
  

  hide() { this.visible = false; }

  show() { this.visible = true; }

  signin(form) {
    // this.isUserLggedIn = true;
    // localStorage.setItem('currentUser', JSON.stringify(form));
    // this.router.navigate(['/home']);
 
    return this.http.post('/muniusers/login', { email: form.name, password: form.pass })
    .map((response: Response) => {

      let user = response.json();
      if(user && user.id){
        this.isUserLggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user;
    }).catch(this.handleError);

  }

  // getUserLoggedIn() {
  //   return this.isUserLggedIn;
  // }

  // signup(data) {
  //   // this.isUserLggedIn = true;
  //   // localStorage.setItem('currentUser', JSON.stringify(form));
  //   // this.router.navigate(['/home']);
  //   window.console.log(typeof(data));
 
  //   return this.http.post('/loginusers', data)
  //   .map((response: Response) => {

  //     let user = response.json();
  //     return user;
  //   }).catch(this.handleError);

  // }

  // getloginUser(id){
  //   return this.http.get('/loginusers/' + id)
  //   .map((response: Response) => {
      
  //     let user = response.json();
  //     return user;
     
  //   }).catch(this.handleError);
  // }

  // changePassword(form){
  //   return this.http.post('/loginusers/change-password',{ oldPassword: form.oldpassword, newPassword: form.password } )
  //   .map((response: Response) => {
      

  //     return response;
     
  //   }).catch(this.handleError);
  // }

  public handleError(error: Response) {

    let data = JSON.parse(error.toString());
    if (data.error.statusCode === 401) {
      
      // localStorage.removeItem('currentUser');
      //  window.location.href = '/login';
    }
    return Observable.throw(error || 'Server error');
  }


}
