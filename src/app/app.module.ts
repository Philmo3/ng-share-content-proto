import { ColoredComponent } from './../components/colored/colored.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { ShareablePlaneComponent } from 'src/components/shareable-plane/shareable-plane.component';
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
    ShareablePlaneComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
