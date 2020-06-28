import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { removeSummaryDuplicates, ParseError } from '@angular/compiler';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  constructor(private cookie: CookieService) { }

  async ngOnInit() {
    let jwt = this.cookie.get("login");
    this.httpGetAsync(`http://localhost:8000/getBook.php/?jwt=${jwt}`, (response) => {
      let parsed = JSON.parse(response);
      let bookLib = "";
      parsed[0].forEach(element => {
        bookLib += element['title'] + "," + element['ISBN'] + "," + element['copies'] + "\r\n";
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
    let jwt = this.cookie.get("login");
    let bookDoc = "";
    bookDoc = document.getElementById("bookLib").innerHTML
    let valArray = [];
    valArray = bookDoc.split("\r\n");
    let returnArray = [];
    valArray.forEach(element => {
      let elementarray = [];
      elementarray = element.split(",");
      let object = {
        ISBN: elementarray[1],
        title: elementarray[0],
        copies: elementarray[2]
      }
      returnArray.push(object);
    });
    this.httpGetAsync(`http://localhost:8000/getBook.php/?jwt=${jwt}&booksArray=${returnArray}`, () => { });


  }

