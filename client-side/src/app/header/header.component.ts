import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { getPermission } from '../globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public logged = false;
  public username;

  constructor(private cookie: CookieService) {
  }

  private httpGetAsync(theUrl: string, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
  }

  async ngOnInit() {
    // Remember to add thsi back "/search"
    const nAllowed: String[] = [];
    const Allowed: String[] = ["/login", "/signup"];
    let pageExt = window.location.pathname;
    
    let userInformation = await getPermission(this.cookie);
    if (userInformation['error'] == undefined) {
      this.username = userInformation["username"];
      this.logged = true;
    }

    switch(this.logged) {
      case true:
        Allowed.forEach(element => {
          if (pageExt == element) {
            window.location.pathname = "/";
          }
        });
        break;
      case false:
        nAllowed .forEach(element => {
          if (pageExt == element) {
            window.location.pathname = "/";
          }
        });
        break;
    }
    
  }

  public logout() {
    this.cookie.delete("login");
    window.location.reload();
  }

}
