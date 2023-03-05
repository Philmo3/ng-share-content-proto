import { Directive, ViewContainerRef, ComponentRef, Type } from '@angular/core';
import { Message } from '../types/messages.class';
import { Shareable } from '../types/shareable.class';

@Directive({
  selector: '[singleDynamicComponent]'
})
export class SingleDynamicComponentDirective {

  private componentRef?: ComponentRef<Shareable>

  constructor(private viewContainerRef: ViewContainerRef) { }

  createComponent(component: Type<Shareable>, message: Message<any>){
    this.viewContainerRef.clear()
    this.componentRef = this.viewContainerRef.createComponent(component)
    this.componentRef.instance.shareId = message.id
    this.setInputs(this.componentRef, message.inputs)
  }

  update(inputs: Map<string, string>){
    inputs?.forEach((value, key) => {
      this.componentRef?.setInput(key, value)
    })
  }

  private setInputs(componentRef: ComponentRef<Shareable>, inputs: any){
    inputs?.forEach((value: any, key: any) => {
      componentRef.setInput(key, value)
    })
  }
}
