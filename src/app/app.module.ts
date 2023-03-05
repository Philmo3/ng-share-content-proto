import { SimpleEditableComponent } from './component/simple-editable/simple-editable.component';
import { ColoredComponent } from './component/colored/colored.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { ShareableModule } from 'src/lib/shareable.module';
import { SHAREABLE_BOUNDARY_TOKEN } from 'src/lib/injectable/bondary-token';
import { SHAREABLE_MAP_TOKEN } from 'src/lib/injectable/shareable-map-token';
import { NameToComponentMap } from './constant/name-to-component.map';
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
    SimpleEditableComponent,
    ShareableModule,
  ],
  providers: [
    {provide: SHAREABLE_BOUNDARY_TOKEN, useValue: '.plane-container'},
    {provide: SHAREABLE_MAP_TOKEN, useValue: NameToComponentMap}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
