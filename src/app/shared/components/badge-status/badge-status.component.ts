import { Component, Input, OnInit } from '@angular/core';
import { EnumSize } from 'src/app/core/utils/size.enums';
import { EnumStatus } from 'src/app/core/utils/status.enums';

@Component({
  selector: 'app-badge-status',
  templateUrl: './badge-status.component.html',
  styleUrls: ['./badge-status.component.scss']
})
export class BadgeStatusComponent implements OnInit {

  @Input('status') statusText: string;
  @Input('size') sizeText: string = 'base';

  private EStatus = EnumStatus;
  private ESize = EnumSize;

  constructor() { }

  ngOnInit(): void {
  }

  get badgeStyle(): string {
    let className:string = 'badge-status';

    switch(this.statusText) {
      case this.EStatus.unattended:
        className += ' unattended-status';
        break;
      case this.EStatus.inProgress:
        className += ' in-progress-status';
        break;
      case this.EStatus.attended:
        className += ' attended-status';
        break;
      default:
        break;
    }

    switch(this.sizeText) {
      case this.ESize.xs:
        className += ' text-xs';
        break;
      case this.ESize.sm:
        className += ' text-sm';
        break;
      case this.ESize.base:
        className += ' text-base';
        break;
      case this.ESize.xl:
        className += ' text-xl';
        break;
      case this.ESize.xl_2:
        className += ' text-2xl';
        break;
      case this.ESize.xl_3:
        className += ' text-3xl';
        break;
      default:
          break;
    }

    return className;
  }

}
