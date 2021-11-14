import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OrdersComponent} from './pages/orders/orders.component';
import {FormsModule} from '@angular/forms';
import { StateChipComponent } from './components/state-chip/state-chip.component';
import { PaginationButtonComponent } from './components/pagination-button/pagination-button.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    StateChipComponent,
    PaginationButtonComponent,
    AppBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
