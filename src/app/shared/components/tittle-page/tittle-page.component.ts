import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tittle-page',
  templateUrl: './tittle-page.component.html',
  styleUrls: ['./tittle-page.component.scss']
})
export class TittlePageComponent implements OnInit {

  @Input('tittle') tittle: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
