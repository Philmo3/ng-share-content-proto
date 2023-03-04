import { Component, Type } from "@angular/core"
import { ColoredComponent } from "src/components/colored/colored.component"


export type ShareableComponentName = 'Colored'

export interface ShareableComponent{
  componentName : ShareableComponentName
}
