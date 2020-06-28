import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupError = "";


  constructor() { }

  ngOnInit(): void {
  }

  public addToDB() {
/**
 * $username = htmlspecialchars_decode($_GET["username"]);
 * $password = htmlspecialchars_decode($_GET["password"]);
 * $firstName = htmlspecialchars_decode($_GET["first"]);
 * $lastName = htmlspecialchars_decode($_GET["last"]);
 * $reason = htmlspecialchars_decode($_GET["reason"]);
 * $email = htmlspecialchars_decode($_GET["email"]);
 * $ZC = htmlspecialchars_decode($_GET["zipcode"]);
 */
    let firstName = (<HTMLInputElement>document.getElementById('firstname')).value;
    let lastName = (<HTMLInputElement>document.getElementById('lastname')).value;
    let username = (<HTMLInputElement>document.getElementById('username')).value;
    let email = (<HTMLInputElement>document.getElementById('email')).value;
    let password = (<HTMLInputElement>document.getElementById('password')).value;
    let zipcode = (<HTMLInputElement>document.getElementById('zipcode')).value;
    let url = `http://127.0.0.1:8000/?reason=create&first=${firstName}&last=${lastName}&username=${username}&password=${password}&email=${email}&zipcode=${zipcode}`;
    this.httpGetAsync(url, (response) => {
      //console.log(response);
      if (!response.includes("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9")) {
        this.signupError = response;
      } else {
        window.location.pathname = "/login";
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
