import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { MeasurementsService } from 'src/app/core/services/measurements.service';
import { Measurements } from 'src/app/core/models/measurements/measurements';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);

@Component({
  selector: 'app-order-pattern',
  templateUrl: './order-pattern.component.html',
  styleUrls: ['./order-pattern.component.scss'],
})
export class OrderPatternComponent implements OnInit {
  @ViewChild('table', { static: false }) el!: ElementRef;
  @ViewChild('table2', { static: false }) el2!: ElementRef;
  currentIndexSlide: number = 0;
  clientId: number = 3;
  measurements: Measurements[] = [];

  espalda = [];
  delantero = [];

  pdf_espalda = [];
  pdf_delantero = [];
  image_64_delantero: string;
  image_64_espalda: string;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: [
      '<i class="fa fa-arrow-left"></i>',
      '<i class="fa fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private measurementsService: MeasurementsService
  ) {}

  ngOnInit(): void {
    this.getMeasurements();
    this.getImageDataUrlFromLocalPath('assets/images/patron_vestido_delantero.png').then(res => this.image_64_delantero = res);
    this.getImageDataUrlFromLocalPath('assets/images/patron_vestido_espalda.png').then(res => this.image_64_espalda = res);

  }

  getMeasurements() {
    this.clientId = Number(sessionStorage.getItem('clientId'));
    this.measurementsService
      .getLastMeasurements(this.clientId)
      .subscribe((res) => {
        this.measurements = res.measurements;
        this.espalda = [
          { segmento: 'A->C', value: this.measurements[1].value / 4 - 1 },
          { segmento: 'A->B ', value: this.measurements[6].value },
          { segmento: 'A->E', value: this.measurements[14].value / 4 - 1 },
          { segmento: 'A->F', value: 2 },
          { segmento: 'C->G', value: 3 },
          { segmento: 'E->H', value: this.measurements[15].value },
          { segmento: 'D->I', value: 21 },
          { segmento: 'J->K', value: this.measurements[12].value / 2 + 1 },
          { segmento: 'B->M', value: this.measurements[26].value },
          { segmento: 'M->N', value: 55 - this.measurements[26].value },
          { segmento: 'M->M1', value: this.measurements[4].value / 4 - 1 },
          { segmento: 'N->N1', value: this.measurements[4].value / 4 - 1 },
          { segmento: 'B->O', value: this.measurements[2].value / 4 + 2 },
          { segmento: 'B->P', value: (this.measurements[2].value / 4 + 2) / 2 },
          { segmento: 'P->Q', value: 14 },
        ];
        this.delantero = [
          { segmento: 'A->C', value: this.measurements[1].value / 4 + 1 },
          { segmento: 'A->B ', value: this.measurements[7].value },
          { segmento: 'A->E', value: this.measurements[14].value / 4 - 1 },
          { segmento: 'A->F', value: this.measurements[14].value / 4 },
          { segmento: 'C->G', value: 4 },
          { segmento: 'E->H', value: this.measurements[15].value },
          { segmento: 'D->I', value: 21 + Math.abs(this.measurements[6].value - this.measurements[7].value) },
          { segmento: 'J->K', value: this.measurements[13].value / 2 + 1 },
          { segmento: 'K->K1', value: 2.7 },
          { segmento: 'A->M', value: this.measurements[8].value},
          { segmento: 'A->N', value: this.measurements[11].value/2},
          { segmento: 'I->O', value: 4},
          { segmento: 'O->P', value: Math.abs(this.measurements[6].value - this.measurements[7].value) },
          { segmento: 'B->Q', value: this.measurements[26].value},
          { segmento: 'Q->R', value: 55 - this.measurements[26].value},
          { segmento: 'Q->Q1', value: this.measurements[4].value / 4 + 1 },
          { segmento: 'R->R1', value: this.measurements[4].value / 4 + 1 },
          { segmento: 'B->S', value: this.measurements[2].value / 4 + 3.5 },
          { segmento: 'T->U', value: 10}
        ];

        this.pdf_delantero = [
          [ 'SEGMENTO', 'VALOR'],
          [  'A->C',  (this.measurements[1].value / 4 + 1).toFixed(2) ],
          [  'A->B ', ( this.measurements[7].value).toFixed(2) ],
          [  'A->E',  (this.measurements[14].value / 4 - 1 ).toFixed(2)],
          [  'A->F',  (this.measurements[14].value / 4).toFixed(2) ],
          [  'C->G',  4 ],
          [  'E->H',  (this.measurements[15].value).toFixed(2) ],
          [  'D->I',  (21 + Math.abs(this.measurements[6].value - this.measurements[7].value) ).toFixed(2)],
          [  'J->K',  (this.measurements[13].value / 2 + 1 ).toFixed(2)],
          [  'K->K1',  2.7 ],
          [  'A->M',  (this.measurements[8].value).toFixed(2)],
          [  'A->N',  (this.measurements[11].value/2).toFixed(2)],
          [  'I->O',  4],
          [  'O->P',  (Math.abs(this.measurements[6].value - this.measurements[7].value) ).toFixed(2)],
          [  'B->Q',  (this.measurements[26].value).toFixed(2)],
          [  'Q->R',  (55 - this.measurements[26].value).toFixed(2)],
          [  'Q->Q1', ( this.measurements[4].value / 4 + 1 ).toFixed(2)],
          [  'R->R1', ( this.measurements[4].value / 4 + 1 ).toFixed(2)],
          [  'B->S',  (this.measurements[2].value / 4 + 3.5 ).toFixed(2)],
          [  'T->U',  10]
        ];
        this.pdf_espalda = [
          [ 'SEGMENTO', 'VALOR'],
          [  'A->C',  (this.measurements[1].value / 4 - 1).toFixed(2) ],
          [  'A->B ',  (this.measurements[6].value).toFixed(2) ],
          [  'A->E',  (this.measurements[14].value / 4 - 1 ).toFixed(2)],
          [  'A->F',  2 ],
          [  'C->G',  3 ],
          [  'E->H',  (this.measurements[15].value).toFixed(2) ],
          [  'D->I',  21 ],
          [  'J->K',  (this.measurements[12].value / 2 + 1 ).toFixed(2)],
          [  'B->M',  (this.measurements[26].value ).toFixed(2)],
          [  'M->N',  (55 -  this.measurements[26].value ).toFixed(2) ],
          [  'M->M1',  (this.measurements[4].value / 4 - 1 ).toFixed(2)],
          [  'N->N1',  (this.measurements[4].value / 4 - 1 ).toFixed(2)],
          [  'B->O',  (this.measurements[2].value / 4 + 2 ).toFixed(2)],
          [  'B->P',  ((this.measurements[2].value / 4 + 2) / 2 ).toFixed(2)],
          [  'P->Q',  14 ],
        ];
      });
  }

  navigateToBack() {
    this.location.back();
  }

  changedSlide(data: SlidesOutputData) {
    this.currentIndexSlide = data.startPosition!;
  }

  /*savePattern() {
    let content = this.el.nativeElement;
    let doc = new jsPDF();
    let _elementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      },
    };
    doc.fromHTML(content.innerHTML, 10, 0, {
      width: 500,
      elementHandlers: _elementHandlers,
    });
    var img = new Image();
    img.src = 'assets/images/patron_vestido_01_01.png';

    doc.addImage(img, 'png', 10, 120);

    //

    let doc2 = new jsPDF();
    doc2.fromHTML(content.innerHTML, 10, 0, {
      width: 500,
      elementHandlers: _elementHandlers,
    });

    var img2 = new Image();
    img2.src = 'assets/images/patron_vestido_01_02.png';
    doc2.addImage(img2, 'png', 10, 120);

    doc.save('patron_espalda.pdf');
    doc2.save('patron_delantero.pdf');
  }
  */

  getDocument() {
    let pdfbody = {
      content: [
        {text: 'PATRÓN DELANTERO', style: 'header'},
        {
          style: 'tableExample',
          table: {
            body: this.pdf_delantero
          },          
          layout: 'lightHorizontalLines'
        },
        { image: this.image_64_delantero,
          height: 800
        },
        {text: 'PATRÓN ESPALDA', style: 'header2'},
        {
          style: 'tableExample',
          table: {
            body: this.pdf_espalda
          },
          layout: 'lightHorizontalLines'
        },
        {image: this.image_64_espalda,height: 800}
      ],
      styles:{
        header: {
          fontSize: 18,
          bold: true,
          margin: [170, 0, 0, 10]
        },
        tableExample: {
          margin: [200, 5, 0, 15]
        },
        header2: {
          fontSize: 18,
          bold: true,
          margin: [180, 5, 0, 15]
        }
       },
       defaultStyle: {
        alignment: 'justify'
      }
    }

    let pdf = pdfMake.createPdf(pdfbody);
    pdf.download('patron_detantero_y_trasero.pdf');
    //pdf.open();
  }


  getImageDataUrlFromLocalPath(localPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        let canvas = document.createElement('canvas');
        let img = new Image();
        img.onload = () => {
            canvas.height = img.height;
            canvas.width = img.width;
            canvas.getContext("2d").drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        }
        img.onerror = () => reject('Imagen no disponible')
        img.src = localPath;
    })
  }
}
