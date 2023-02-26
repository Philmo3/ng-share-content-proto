import { BehaviorSubject } from 'rxjs'
import { ShareableComponent, ShareableComponentName, ShareableTypeDefinition } from './shareable.type'

export class MessagesHandler{

  private idIndex = 1

  private _message?: Message<ShareableTypeDefinition>

  private _messageSubject = new BehaviorSubject<Message<ShareableTypeDefinition> | null>(null)
  message$ = this._messageSubject.asObservable()

  constructor(){}

  create(message: socketMessage){
    this._message=new Message(this.idIndex, message.type, {componentName: message.componentName})
    this._messageSubject.next(this._message)
    this.idIndex++
  }

  add(message: socketMessage){
    this._message=new Message(message.id!, message.type, {componentName: message.componentName})
    this._messageSubject.next(this._message)
    this.idIndex = message.id!++
  }

  update(message: socketMessage){
    this._message = new Message(message.id!, message.type, {componentName: message.componentName}, message.inputs)
    this._messageSubject.next(this._message)
  }

  delete(messageId: number){

  }
}

export class Message<ShareableType>{
  id: number
  componentName: ShareableComponentName
  inputs?: any
  type: MessageType

  constructor(id: number, type: MessageType, component: ShareableType, inputs?: Map<string, string>){
    this.id = id
    this.type = type
    this.componentName = (component as ShareableComponent<any>).componentName
    this.inputs = inputs
  }
}

export type MessageType = 'Create' | 'Update' | 'Delete'
export type socketMessage = Omit<Message<any>, "id" | "componentName"> & { id?: number, componentName?: string, clientId: number }