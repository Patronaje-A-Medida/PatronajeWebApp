import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-order-pattern',
  templateUrl: './order-pattern.component.html',
  styleUrls: ['./order-pattern.component.scss']
})
export class OrderPatternComponent implements OnInit {

  @ViewChild('table',{static:false}) el!: ElementRef
  currentIndexSlide: number;

  espalda = [
   { 'segmento': "A->C",'value': 45},
    { 'segmento': "A->B ", 'value': 45},
    { 'segmento': "A->E", 'value': 44},
    { 'segmento': "A->F",    'value': 44},
    { 'segmento': "C->G",    'value': 44},
    { 'segmento': "E->H",    'value': 44},
    { 'segmento': "D->I",    'value': 44},
    { 'segmento': "J->K",    'value': 44},
    { 'segmento': "B->M",    'value': 44},
    { 'segmento': "M->N",    'value': 44},
    { 'segmento': "M->M1",    'value': 44},
    { 'segmento': "N->N1",    'value': 44},
    { 'segmento': "B->O",    'value': 44},
    { 'segmento': "B->P",    'value': 44},
    { 'segmento': "P->Q",    'value': 44},

  ]
  delantero = [
    { 'segmento': "A->C",'value': 44},
     { 'segmento': "A->B ", 'value': 44},
     { 'segmento': "A->E", 'value': 44},
     { 'segmento': "A->F",    'value': 44},
     { 'segmento': "C->G",    'value': 44},
     { 'segmento': "E->H",    'value': 44},
     { 'segmento': "D->I",    'value': 44},
     { 'segmento': "J->K",    'value': 44},
     { 'segmento': "K->K1",    'value': 44},
     { 'segmento': "B->M",    'value': 44},
    { 'segmento': "M->N",    'value': 44},
    { 'segmento': "M->M1",    'value': 44},
    { 'segmento': "N->N1",    'value': 44},
    { 'segmento': "B->O",    'value': 44},
    { 'segmento': "B->P",    'value': 44},
    { 'segmento': "P->Q",    'value': 44},
 
   ]

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

  changedSlide(data: SlidesOutputData) {
    this.currentIndexSlide = data.startPosition!
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
