import { ConnectionService } from '../../app/connection.service';
import { NameToComponentMap } from '../constant/name-to-component.map';
import { ComponentRef, Directive, Type, ViewContainerRef } from '@angular/core';
import { Message } from 'src/lib/types/messages.class';
import { Shareable } from 'src/lib/types/shareable.class';

@Directive({
  selector: '[dynamicTemplate]',
  standalone: true
})
export class DynamicTemplateDirective {

  private componentsReference: Map<string, ComponentRef<Shareable>> = new Map()

  messages$ = this.connectionService.messagesHandler.message$.subscribe((message) => {
    console.log(message)
    switch(message?.type){
      case 'Create' : {
        this.add(message)
        break
      }
      case 'Update': {
        this.update(message)
        break
      }
    }
  })

  constructor(
    private viewContainerRef: ViewContainerRef,
    private connectionService: ConnectionService,
    ) { }

  add(message: Message<any>){
    const component = NameToComponentMap.get(message.componentName)
    if(component){
      const componentRef = this.viewContainerRef.createComponent(component)
      componentRef.instance.shareId = message.id
      this.setInputs(componentRef, message.inputs)
      this.componentsReference.set(message.id, componentRef)
    }
    
  }

  update(message: Message<any>){
    const componentRef = this.componentsReference.get(message.id)
    if(componentRef){
      this.setInputs(componentRef, message.inputs)
    }
  }

  delete(id: number){}

  private setInputs(componentRef: ComponentRef<Shareable>, inputs: any){
    inputs?.forEach((value: any, key: any) => {
      componentRef.setInput(key, value)
    })
  }
}
