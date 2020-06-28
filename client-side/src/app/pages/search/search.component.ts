import { CardDirective } from './../../card.directive';
import { CardComponent } from '../../card/card.component';
import { CookieService } from 'ngx-cookie-service';
import { async } from '@angular/core/testing';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild(CardDirective, {static: true}) cardHost: CardDirective;

  public cardStuff = "";

  constructor(private cookie:CookieService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    (<HTMLElement>document.getElementById("bookSearch")).innerHTML = this.cardStuff;
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('myParam');
  }

  private createCard(bookCoverURL, bookTitle, bookAuthor, supplier, isbn) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CardComponent);
    const viewContainerRef = this.cardHost.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<CardComponent>componentRef.instance).data = {bk: bookCoverURL, bt: bookTitle, ba: bookAuthor, s: supplier, isbn: isbn};
  }

  async search() {
    const viewContainerRef = this.cardHost.viewContainerRef;
    viewContainerRef.clear();
    let query = (<HTMLInputElement>document.getElementById("bookSearch")).value;
    let distance = (<HTMLInputElement>document.getElementById("distance")).value;
    if(distance==undefined || distance=="") {
      distance="1000";
    }

    this.httpGetAsync(`http://localhost:8000/search.php/?jwt=${this.cookie.get("login")}&query=${query}&distance=${distance}`, (response) => {
      let parsed = JSON.parse(response);
      console.log(parsed);
      this.cardStuff="";
      parsed.forEach(element => {
        this.cardStuff+=this.createCard(element["imageURL"],element["title"],element["author"], element["seller"], element["isbn"]);
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
  /*$jwt = htmlspecialchars_decode($_GET["jwt"]);
  $usr = htmlspecialchars_decode($_GET["otherUsername"]);
  $isbn = htmlspecialchars_decode($_GET["isbn"]);
  $replaceVal = htmlspecialchars_decode($_GET["replaceisbn"]);*/

}