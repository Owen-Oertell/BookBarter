import { CookieService } from 'ngx-cookie-service';
import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public cardStuff = "";

  constructor(private cookie:CookieService ) { }

  ngOnInit(): void {
    (<HTMLElement>document.getElementById("bookSearch")).innerHTML = this.cardStuff;
  }

  private createCard(bookCoverURL, bookTitle, bookAuthor, supplier) {
    return `<div class='card' style='width: 20rem;'><img class='card-img-top' src='${bookCoverURL}' alt='Book Image'><div class='card-body'> \
      <h3>${bookTitle}</h3> \
      <h4>by ${bookAuthor}</h4> \
      <p>Supplied by ${supplier}</p> \
      <button class='button' (click)='addToQueue()'>Trade for this Book</button> \
      </div> \
      </div>`;
  }

  async search() {
    let query = (<HTMLInputElement>document.getElementById("bookSearch")).value;
    let distance = (<HTMLInputElement>document.getElementById("bookSearch")).value;
    if(distance==undefined || distance=="") {
      distance="1000";
    }

    this.httpGetAsync(`http://localhost:8000/search.php/?jwt=${this.cookie.get("login")}&query=${query}&distance=${distance}`, (response) => {
      let parsed = JSON.parse(response);
      console.log(parsed);
      this.cardStuff="";
      parsed.forEach(element => {
        this.cardStuff+=this.createCard(element["imageURL"],element["title"],element["author"], element["seller"]);
      });
      (<HTMLElement>document.getElementById("bookSearch")).innerHTML = this.cardStuff;
    });
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


/* <div class="card" style="width: 20rem;">
      <img class="card-img-top" src="..." alt="Card image cap">
      <div class="card-body">
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
    </div>
    */