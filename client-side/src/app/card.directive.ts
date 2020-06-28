import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCard]'
})
export class CardDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
