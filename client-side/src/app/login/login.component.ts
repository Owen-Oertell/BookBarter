import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginError = "";

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
  }

  public verify() {
    var username = (<HTMLInputElement>document.getElementById('username')).value;
    var password = (<HTMLInputElement>document.getElementById('password')).value;
    let url = `http://127.0.0.1:8000/?reason=verify&username=${username}&password=${password}`;
    this.httpGetAsync(url, (response) => {
      //console.log(response);
      if (response == "The username or password is incorect.") {
        this.loginError = "Username or Password is incorrect";
        
      } else {
        this.cookie.set("login", response, 1);
        window.location.pathname = "";
      }
      
    })
  }

  private httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
  }

}
