import { Component, Type } from '@angular/core';

import { BehaviorSubject } from 'rxjs'
import { ShareableComponent, ShareableComponentName, ShareableTypeDefinition } from './shareableComponent.type'

export class MessagesHandler{

  private _message?: Message<ShareableTypeDefinition>

  private _messageSubject = new BehaviorSubject<Message<ShareableTypeDefinition> | null>(null)
  message$ = this._messageSubject.asObservable()

  constructor(){}

  add(message: socketMessage){
    this._message=new Message(1, message.type, {componentName: message.componentName})
    this._messageSubject.next(this._message)
  }

  update(message: Message<ShareableTypeDefinition>){

  }

  delete(messageId: number){

  }
}

export class Message<ShareableType>{
  id: number
  componentName: ShareableComponentName
  inputs?: Map<string, string> = new Map()
  type: MessageType

  constructor(id: number, type: MessageType, component: ShareableType, inputs?: Map<string, string>){
    this.id = id
    this.type = type
    this.componentName = (component as ShareableComponent<any>).componentName
    this.inputs = inputs
  }
}

export type MessageType = 'Create' | 'Update' | 'Delete'
export type socketMessage = Omit<Message<any>, "id">