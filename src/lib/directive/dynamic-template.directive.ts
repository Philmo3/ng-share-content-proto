import { MoveableComponent } from './../components/moveable/moveable.component';
import { ConnectionService } from '../service/connection.service';
import { NameToComponentMap } from '../../app/constant/name-to-component.map';
import { ComponentRef, Directive, Inject, Type, ViewContainerRef } from '@angular/core';
import { Message } from 'src/lib/types/messages.class';
import { Shareable } from 'src/lib/types/shareable.class';
import { SHAREABLE_MAP_TOKEN } from '../injectable/shareable-map-token';

@Directive({
  selector: '[dynamicTemplate]',
  standalone: true
})
export class DynamicTemplateDirective {

  private componentsReference: Map<string, ComponentRef<MoveableComponent>> = new Map()

  messages$ = this.connectionService.messagesHandler.message$.subscribe((message) => {
    switch(message?.type){
      case 'Create' : {
        this.add(message)
        break
      }
      case 'Update': {
        this.update(message)
        break
      }
      case 'Position': {
        this.updatePostion(message)
        break
      }
    }
  })

  constructor(
    private viewContainerRef: ViewContainerRef,
    private connectionService: ConnectionService,
    @Inject(SHAREABLE_MAP_TOKEN) private mappedComponentRefs: Map<string, Type<Shareable>>,
    ) { }

  add(message: Message<any>){
    const component = this.mappedComponentRefs.get(message.componentName)
    if(component){
      const componentRef = this.createMovable(message, component)
      this.componentsReference.set(message.id, componentRef)
      if(message.position){
        componentRef.instance.updatePosition(message.position)
      }
    }
  }

  update(message: Message<any>){
    const componentRef = this.componentsReference.get(message.id)
    if(componentRef){
      componentRef.instance.update(message.inputs)
    }
  }

  updatePostion(message: Message<any>){
    const componentRef = this.componentsReference.get(message.id)
    if(componentRef){
      componentRef.instance.updatePosition(message.position!)
    }
  }

  delete(id: number){}

  private createMovable(message: Message<any>, component: Type<any>){
    const moveableComponent = this.viewContainerRef.createComponent(MoveableComponent)
    moveableComponent.instance.createComponent(component, message)
    moveableComponent.instance.referenceShareableId = message.id
    return moveableComponent
  }
}
