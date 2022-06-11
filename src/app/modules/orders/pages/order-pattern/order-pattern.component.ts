import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import * as jsPDF from 'jspdf';
import PDFDocument  from 'pdfkit';
import * as fs from 'fs';
import { MeasurementsService } from 'src/app/core/services/measurements.service';
import { Measurements } from 'src/app/core/models/measurements/measurements';

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
  }

  getMeasurements() {
    this.clientId = Number(sessionStorage.getItem('clientId'));
    this.measurementsService
      .getLastMeasurements(this.clientId)
      .subscribe((res) => {
        this.measurements = res.measurements;
        this.espalda = [
          { segmento: 'A->C', value: this.measurements[13].value / 4 - 1 },
          { segmento: 'A->B ', value: this.measurements[6].value },
          { segmento: 'A->E', value: this.measurements[14].value / 4 - 1 },
          { segmento: 'A->F', value: 2 },
          { segmento: 'C->G', value: 3 },
          { segmento: 'E->H', value: 12 },
          { segmento: 'D->I', value: 21 },
          { segmento: 'J->K', value: this.measurements[12].value / 2 + 1 },
          { segmento: 'B->M', value: this.measurements[9].value },
          { segmento: 'M->N', value: this.measurements[9].value },
          { segmento: 'M->R', value: this.measurements[5].value / 4 - 1 },
          { segmento: 'N->S', value: this.measurements[5].value / 4 - 1 },
          { segmento: 'B->O', value: this.measurements[3].value / 4 + 2 },
          { segmento: 'B->P', value: (this.measurements[3].value / 4 + 2) / 2 },
          { segmento: 'P->Q', value: 14 },
        ];
        this.delantero = [
          { segmento: 'A->C', value: this.measurements[1].value / 4 + 1 },
          { segmento: 'A->B ', value: this.measurements[7].value },
          { segmento: 'A->E', value: this.measurements[14].value / 4 - 1 },
          { segmento: 'A->F', value: this.measurements[14].value / 4 },
          { segmento: 'C->G', value: 4 },
          { segmento: 'E->H', value: 12 },
          { segmento: 'D->I', value: 21 },
          { segmento: 'J->K', value: this.measurements[12].value / 2 + 1 },
          { segmento: 'K->K1', value: 2.7 },
          { segmento: 'B->M', value: this.measurements[9].value },
          { segmento: 'M->N', value: this.measurements[9].value },
          { segmento: 'M->T', value: this.measurements[5].value / 4 - 1 },
          { segmento: 'N->U', value: this.measurements[5].value / 4 - 1 },
          { segmento: 'B->O', value: this.measurements[3].value / 4 + 2 },
          { segmento: 'B->P', value: (this.measurements[3].value / 4 + 2) / 2 },
          { segmento: 'P->Q', value: 14 },
        ];
      });
  }

  navigateToBack() {
    this.location.back();
  }

  changedSlide(data: SlidesOutputData) {
    this.currentIndexSlide = data.startPosition!;
  }

  savePattern() {
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
  

  getDocument() {
    /// doc pdf normal
    let doc_delantero = new PDFDocument();
    doc_delantero.pipe(fs.createWriteStream('patron_delantero.pdf'));

    ;(async function createTable(){
      // table
      const table = { 
        title: 'titulo de nos e que',
        headers: ["Segmento", "valor"],
        rows: [
          [ "Switzerland", "12%", "+1.12%" ],
          [ "France", "67%", "-0.98%" ],
          [ "England", "33%", "+4.44%" ]
        ],
      };
  
      // the magic (async/await)
      await doc_delantero.table(table, { width: 500 });

      doc_delantero.end();
    })();

  }
}
