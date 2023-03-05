import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTemplateDirective } from './directive/dynamic-template.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ShareablePlaneComponent } from './components/shareable-plane/shareable-plane.component';
import { ConnectionService } from './service/connection.service';
import { MoveableComponent } from './components/moveable/moveable.component';
import { SingleDynamicComponentDirective } from './directive/single-dynamic-component.directive';



@NgModule({
  declarations: [ShareablePlaneComponent, MoveableComponent, SingleDynamicComponentDirective],
  exports: [ShareablePlaneComponent],
  imports: [
    CommonModule, 
    DynamicTemplateDirective, 
    DragDropModule
  ],
  providers: [ConnectionService]
})
export class ShareableModule { }
