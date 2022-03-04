import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-body-params',
  templateUrl: './basic-body-params.component.html',
  styleUrls: ['./basic-body-params.component.scss']
})
export class BasicBodyParamsComponent implements OnInit {

  @Input('basicDimensions') params: number[];

  height: number;
  chest: number;
  waist: number;
  hip: number;

  constructor() { }

  ngOnInit(): void {
    if(this.params != null || this.params.length > 0) {
      [this.height, this.chest, this.waist, this.hip] = this.params;
    }
  }

}
