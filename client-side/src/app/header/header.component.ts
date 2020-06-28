import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { getPermission } from '../globals';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public logged = false;
  public username;
  public buyerBook;
  public yourBook;
  public element;

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
      setInterval(() => this.checkIfOffers(),10000);
    }

    switch (this.logged) {
      case true:
        Allowed.forEach(element => {
          if (pageExt == element) {
            window.location.pathname = "/";
          }
        });
        break;
      case false:
        nAllowed.forEach(element => {
          if (pageExt == element) {
            window.location.pathname = "/";
          }
        });
        break;
    }

  }

  private checkIfOffers() {
    this.httpGetAsync(`http://localhost:8000/timeout.php/?jwt=${this.cookie.get("login")}`, (response) => {
      let parsed = JSON.parse(response);
      this.element = parsed[0];
        // Trade!
        
        console.log(this.element);
        this.yourBook = (this.element["title"] + " by " + this.element["author"]);
        this.buyerBook = (this.element["queue"][0]["title"] + " by " + this.element["queue"][0]["author"]);
        (<HTMLElement>document.getElementById("ban")).classList.add("banner");
    });
  }


  public rejectCurrentOffer() {
    this.httpGetAsync(`http://localhost:8000/deny.php/?jwt=${this.cookie.get("login")}&isbn=${this.element["isbn"]}`, (response) => {
      console.log(response);
      (<HTMLElement>document.getElementById("ban")).classList.remove("banner");
    });
  }

  public acceptCurrentOffer() {
    this.httpGetAsync(`http://localhost:8000/accept.php/?jwt=${this.cookie.get("login")}&isbn=${this.element["isbn"]}`, (response) => {
      alert(`Please contact ${this.element["queue"][0]["email"]} to trade.`);
      console.log(response);
      (<HTMLElement>document.getElementById("ban")).classList.remove("banner");
    });
  }


  public logout() {
    this.cookie.delete("login");
    window.location.reload();
  }

}
