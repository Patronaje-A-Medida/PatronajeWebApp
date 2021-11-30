import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loading-pulse',
  templateUrl: './loading-pulse.component.html',
  styleUrls: ['./loading-pulse.component.scss']
})
export class LoadingPulseComponent {

  @Input() visible = false;

}
