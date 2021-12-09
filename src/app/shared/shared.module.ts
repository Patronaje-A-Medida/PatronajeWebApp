import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ButtonActionComponent } from './components/button-action/button-action.component';



@NgModule({
  declarations: [
    BaseLayoutComponent,
    NavBarComponent,
    ButtonActionComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
