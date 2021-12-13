import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { Router, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { filter } from 'rxjs/operators';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OrdersComponent} from './pages/orders/orders.component';
import {StateChipComponent} from './components/state-chip/state-chip.component';
import {PaginationButtonComponent} from './components/pagination-button/pagination-button.component';
import {AppBarComponent} from './components/app-bar/app-bar.component';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {OrderDetailsComponent} from './pages/order-details/order-details.component';
import {OrderDataComponent} from './components/order-data/order-data.component';
import {ClientDetailsComponent} from './components/client-details/client-details.component';
import { LoadingPulseComponent } from './components/loading-pulse/loading-pulse.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingModule } from './modules/landing/landing.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    StateChipComponent,
    PaginationButtonComponent,
    AppBarComponent,
    SideNavComponent,
    OrderDetailsComponent,
    OrderDataComponent,
    ClientDetailsComponent,
    LoadingPulseComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LandingModule,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (router: Router, viewportScroller: ViewportScroller) {
    viewportScroller.setOffset([0, 60]);
    router.events.pipe(filter(e => e instanceof Scroll)).subscribe((e: Scroll) => {
      if (e.anchor) {
        // anchor navigation
        setTimeout(() => {
          viewportScroller.scrollToAnchor(e.anchor);
        })
      } else if (e.position) {
        // backward navigation
        viewportScroller.scrollToPosition(e.position);
      } else {
        // forward navigation
        viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
}
