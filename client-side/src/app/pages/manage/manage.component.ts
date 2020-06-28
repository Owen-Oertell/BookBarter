import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { removeSummaryDuplicates, ParseError } from '@angular/compiler';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  constructor(private cookie: CookieService) { }
  public textToDisp=""

  async ngOnInit() {
    let jwt = this.cookie.get("login");
    this.httpGetAsync(`http://localhost:8000/getBook.php/?jwt=${jwt}`, (response) => {
      let parsed = JSON.parse(response);
      let bookLib = "";
      console.log(parsed);
      parsed.forEach(element => {
        bookLib += element['title'] + "," + element['ISBN'] + "," + element['copies'] + "\r\n";
      });
      (<HTMLInputElement>document.getElementById("bookLib")).value = bookLib;
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
    let bookDoc = (<HTMLInputElement>document.getElementById("bookLib")).value.trim();
    
    let jwt = this.cookie.get("login");
    let valArray = [];
    valArray = bookDoc.split("\n");
    let returnArray = [];
    valArray.forEach(element => {
      let elementarray = [];
      elementarray = element.split(",");
      let object = {
        "ISBN": elementarray[1],
        "title": elementarray[0],
        "copies": elementarray[2]
      }
      returnArray.push(object);
    });
    let returnVal = JSON.stringify(returnArray);
    this.httpGetAsync(`http://localhost:8000/setBook.php/?jwt=${jwt}&bookArray=${returnVal}`, (response) => {
      var ts = new Date();
      this.textToDisp = "Saved on " + ts.toDateString();
    }); 
  }
}