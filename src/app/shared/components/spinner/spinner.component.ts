import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input('diameter') diameter: string;

  constructor() { }

  ngOnInit(): void {
  }

  get sizeSpinner(): string {
    return `width: ${this.diameter}; height: ${this.diameter};`;
  }

}
