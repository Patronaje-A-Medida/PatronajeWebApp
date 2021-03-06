import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { filter } from 'rxjs/operators';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingModule } from './modules/landing/landing.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { UserDataService } from './core/services/user-data.service';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { JwtTokenInterceptor } from './core/interceptors/jwt-token.interceptor';
import { ConfigurationTypesService } from './core/services/configuration-types.service';
import { EmployeesModule } from './modules/employees/employees.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LandingModule,
    DashboardModule,
    SharedModule,
    CoreModule,
    EmployeesModule,
  ],
  providers: [
    UserDataService,
    //{ provide: APP_INITIALIZER, useFactory: appInilize, multi: true, deps: [UserDataService]} -> averiguar mejor
    { 
      provide: APP_INITIALIZER, 
      useFactory: (cts: ConfigurationTypesService) => () => cts.getAll(), 
      deps: [ConfigurationTypesService], 
      multi: true 
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  
  constructor(router: Router, viewportScroller: ViewportScroller) {
    viewportScroller.setOffset([0, 60]);
    router.events
      .pipe(filter((e) => e instanceof Scroll))
      .subscribe((e: Scroll) => {
        if (e.anchor) {
          // anchor navigation
          setTimeout(() => {
            viewportScroller.scrollToAnchor(e.anchor);
          });
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
