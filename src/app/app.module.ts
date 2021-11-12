import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentExampleComponent } from './components/component-example/component-example.component';
import { PageExampleComponent } from './pages/page-example/page-example.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentExampleComponent,
    PageExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
