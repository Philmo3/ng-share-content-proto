import { Component, Type } from "@angular/core"
import { ColoredComponent } from "src/app/component/colored/colored.component"


export type ShareableComponentName = 'Colored' | 'SimpleEditable'

export interface ShareableComponent{
  componentName : ShareableComponentName
}
