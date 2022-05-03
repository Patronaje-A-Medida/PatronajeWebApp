import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-order-pattern',
  templateUrl: './order-pattern.component.html',
  styleUrls: ['./order-pattern.component.scss']
})
export class OrderPatternComponent implements OnInit {

  @ViewChild('table',{static:false}) el!: ElementRef

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-arrow-left"></i>','<i class="fa fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  navigateToBack() {
    this.location.back();
  }

  savePattern() {
    let content=this.el.nativeElement;
    let doc = new jsPDF();
    let _elementHandlers =
    {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.fromHTML(content.innerHTML,10,0,{

      'width':500,
      'elementHandlers':_elementHandlers
    });
    var img = new Image()
    img.src = 'assets/images/image 11.png'

    doc.addImage(img, 'png', 0, 150)

    doc.save('test.pdf');
  }

}
