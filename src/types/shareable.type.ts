import { Component, Type } from "@angular/core"
import { ColoredComponent } from "src/components/colored/colored.component"


export type ShareableComponentName = 'Colored'

export interface ShareableComponent<name extends ShareableComponentName>{
  componentName : name
}

export type coloredShare = ShareableComponent<'Colored'>
//export const ColoredComponentDef = new IShareableComponent<'Colored', ColoredComponent>('Colored', ColoredComponent)

export type ShareableTypeDefinition = coloredShare
export type ShareableComponentType = coloredShare
