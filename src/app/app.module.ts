import { ColoredComponent } from './component/colored/colored.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { ShareablePlaneComponent } from 'src/lib/components/shareable-plane/shareable-plane.component';
import { ShareableModule } from 'src/lib/shareable.module';
import { SHAREABLE_BOUNDARY_TOKEN } from 'src/lib/injectable/bondary-token';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ColoredComponent,
    ShareableModule,
  ],
  providers: [{provide: SHAREABLE_BOUNDARY_TOKEN, useValue: '.plane-container'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
