import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ButtonActionComponent } from './components/button-action/button-action.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonActionOutlineComponent } from './components/button-action-outline/button-action-outline.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';



@NgModule({
  declarations: [
    BaseLayoutComponent,
    NavBarComponent,
    ButtonActionComponent,
    FooterComponent,
    ButtonActionOutlineComponent,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ButtonActionComponent,
    ButtonActionOutlineComponent,
    SnackBarComponent,
  ]
})
export class SharedModule { }
