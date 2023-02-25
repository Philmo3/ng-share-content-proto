import { NameToComponentMap } from './../constant/name-to-component.map';
import { ComponentRef, Directive, ViewContainerRef } from '@angular/core';
import { Message } from 'src/types/messages.class';
import { ShareableComponentType } from 'src/types/shareableComponent.type';

@Directive({
  selector: '[dynamicTemplate]',
  standalone: true
})
export class DynamicTemplateDirective {

  private componentsReference: Map<number, ComponentRef<ShareableComponentType>> = new Map()

  constructor(private viewContainerRef: ViewContainerRef) { }

  add(message: Message<any>){

    const component = NameToComponentMap.get(message.componentName)
    if(component){
      const componentRef = this.viewContainerRef.createComponent(component)
      this.componentsReference.set(message.id, componentRef)
    }
    
  }

  update(message: Message<any>){}

  delete(id: number){}
}
