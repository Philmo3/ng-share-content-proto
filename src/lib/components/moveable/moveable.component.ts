import { ConnectionService } from './../../service/connection.service';
import { CdkDragEnd, CdkDrag, Point } from '@angular/cdk/drag-drop';
import { Component, Inject, Type, ViewChild } from '@angular/core';
import { SingleDynamicComponentDirective } from 'src/lib/directive/single-dynamic-component.directive';
import { SHAREABLE_BOUNDARY_TOKEN } from 'src/lib/injectable/bondary-token';
import { Message } from 'src/lib/types/messages.class';
import { Shareable } from 'src/lib/types/shareable.class';

@Component({
  selector: 'app-moveable',
  templateUrl: './moveable.component.html',
  styleUrls: ['./moveable.component.css']
})
export class MoveableComponent {
  @ViewChild(CdkDrag, {static: true}) cdkDrag!: CdkDrag
  @ViewChild(SingleDynamicComponentDirective, {static: true}) singleDynamicComponentDirective!: SingleDynamicComponentDirective

  referenceShareableId?: string

  constructor(
  @Inject(SHAREABLE_BOUNDARY_TOKEN) public boundary: string,
  private connectionService: ConnectionService,
  ){}

  createComponent(shareableComponent: Type<Shareable>, message: Message<any>){
    this.singleDynamicComponentDirective.createComponent(shareableComponent, message)
  }

  update(inputs: Map<string, string>){
    this.singleDynamicComponentDirective.update(inputs)
  }

  onDropped(event: CdkDragEnd){
    console.log(event)
    console.log()
    this.connectionService.updatePosition(this.referenceShareableId!, this.cdkDrag.getFreeDragPosition())
  }

  updatePosition(position: Point){
    this.cdkDrag.setFreeDragPosition(position)
  }
}
