import { Component, HostListener } from '@angular/core';
import { DocumentEventsService } from './shared/services/document-events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //open = false;

  title = 'PatronajeWebApp';

  constructor(private docEventsService: DocumentEventsService) {}
  
  @HostListener('document:click', ['$event'])
  documentClick($event: any): void {
    this.docEventsService.documentClickedTarget.next($event.target);
  }

  /*menuClickHandler(): void {
    this.open = true;
  }

  closeSideNavHandler(): void {
    this.open = false;
  }*/

}
