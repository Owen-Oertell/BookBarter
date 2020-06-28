import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, Input } from '@angular/core';
import { AdComponent } from '../ad.component';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent{

  @Input() data: any;

  constructor(private cookie:CookieService) { }

  ngOnInit(): void {
  }

  //otherUsername, isbn
  public makeTrade() {
    console.log("Making trade");
    return;
    /*let replacementBook = (<HTMLInputElement>document.getElementById("newisbn")).value;
    this.httpGetAsync(`http://localhost:8000/makeOffer.php/?jwt=${this.cookie.get("login")}&otherUsername=${otherUsername}&isbn=${isbn}&replaceISBN=${replacementBook}`, () => {
      alert("You have requested a trade with this person.")
    })*/
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
