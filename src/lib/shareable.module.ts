import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTemplateDirective } from './directive/dynamic-template.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ShareablePlaneComponent } from './components/shareable-plane/shareable-plane.component';



@NgModule({
  declarations: [ShareablePlaneComponent],
  exports: [ShareablePlaneComponent],
  imports: [
    CommonModule, 
    DynamicTemplateDirective, 
    DragDropModule
  ],
})
export class ShareableModule { }
