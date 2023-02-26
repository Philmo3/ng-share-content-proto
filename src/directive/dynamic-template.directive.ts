import { NameToComponentMap } from './../constant/name-to-component.map';
import { ComponentRef, Directive, Type, ViewContainerRef } from '@angular/core';
import { Message } from 'src/types/messages.class';
import { ShareableComponentType } from 'src/types/shareable.type';
import { Shareable } from 'src/types/shareable.class';

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
      componentRef.instance.shareId = message.id
      this.componentsReference.set(message.id, componentRef)
    }
    
  }

  update(message: Message<any>){
    const componentRef = this.componentsReference.get(message.id)
    if(componentRef){
      message.inputs?.forEach((value: any, key: any) => {
        componentRef.setInput(key, value)
      })
    }
  }

  delete(id: number){}
}
