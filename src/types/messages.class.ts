import { BehaviorSubject } from 'rxjs'
import { ShareableComponent, ShareableComponentName } from './shareable.type'

export class MessagesHandler{

  private _message?: Message<ShareableComponent>

  private _messageSubject = new BehaviorSubject<Message<ShareableComponent> | null>(null)
  message$ = this._messageSubject.asObservable()

  constructor(){}

  add(message: socketMessage){
    this._message=new Message(message.id!, message.type, {componentName: message.componentName}, message.inputs)
    this._messageSubject.next(this._message)
  }

  update(message: socketMessage){
    this._message = new Message(message.id!, message.type, {componentName: message.componentName}, message.inputs)
    this._messageSubject.next(this._message)
  }

  delete(messageId: number){

  }
}

export class Message<ShareableType>{
  id: string
  componentName: ShareableComponentName
  inputs?: any
  type: MessageType

  constructor(id: string, type: MessageType, component: ShareableType, inputs?: Map<string, string>){
    this.id = id
    this.type = type
    this.componentName = (component as ShareableComponent).componentName
    this.inputs = inputs
  }
}

export type MessageType = 'Create' | 'Update' | 'Delete'
export type socketMessage = Omit<Message<any>, "id" | "componentName"> & {id?: string, componentName?: string, clientId: number }