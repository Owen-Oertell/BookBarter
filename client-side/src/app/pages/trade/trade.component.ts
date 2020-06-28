import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { url } from 'inspector';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {

  constructor(private cookie:CookieService) { }

  ngOnInit(): void {
  }

  async addBook(){
    let tradeVal = (<HTMLInputElement>document.getElementById("tradeSearch")).value
    this.httpGetAsync(`http://localhost:8000/addBookToQueue.php/?isbn=${tradeVal}&jwt=${this.cookie.get("login")}`,()=>{})
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


