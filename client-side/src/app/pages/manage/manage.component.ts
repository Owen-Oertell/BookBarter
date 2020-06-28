import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { removeSummaryDuplicates, ParseError } from '@angular/compiler';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  constructor(private cookie:CookieService) { }

  async ngOnInit() {
    let jwt = this.cookie.get("login");
    this.httpGetAsync(`http://localhost:8000/getBook.php/?jwt=${jwt}`, (response) => {
      let parsed = JSON.parse(response);
      let bookLib = "";
      parsed[0].forEach(element => {
        bookLib += element['name'] + "," + element['ISBN'] + "," + element['copies'] + "\r\n";
      });
      document.getElementById("bookLib").innerHTML = bookLib;
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

  async saveBooks() {

  };

}

