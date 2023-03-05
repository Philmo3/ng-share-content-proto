import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { Subscription } from 'rxjs';
import { MessagesHandler, socketMessage } from 'src/lib/types/messages.class';
import { ShareableComponent } from 'src/lib/types/shareable.type';
import { Point } from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid'
@Injectable()
export class ConnectionService {

  private webSocketSub?: WebSocketSubject<socketMessage>
  private webSocketSubscription? : Subscription
  messagesHandler: MessagesHandler = new MessagesHandler()

  clientId = uuidv4()

  constructor() {}

  connect(roomName: string){
    if(!this.webSocketSub || this.webSocketSub.closed){
      this.webSocketSub = webSocket(`${environment.wsUrl}?roomName=${roomName}`)
      this.webSocketSubscription = this.webSocketSub.subscribe({
        next: (payload) => this.onNewMessage(payload)
      })
    }
  }

  disconnect(){
    this.webSocketSubscription?.unsubscribe()
  }

  createElement(shareable: ShareableComponent){
    this.webSocketSub?.next({type: 'Create', componentName: shareable.componentName, clientId: this.clientId})
  }

  update(id: string, inputs: Map<string, string>){
    this.webSocketSub?.next({type: 'Update', id, inputs: Object.fromEntries(inputs), clientId: this.clientId})
  }

  updatePosition(id: string, point: Point){
    this.webSocketSub?.next({type: 'Position', position: point, id, clientId: this.clientId})
  }

  private onNewMessage(messagePayload: socketMessage){

    switch(messagePayload.type){
      case 'Create' : {
        this.messagesHandler.add(messagePayload)
        break;
      }

      case 'Update' : {
        this.messagesHandler.update(messagePayload)
        break;
      }

      case 'Position': {
        if(messagePayload.clientId !== this.clientId){
          this.messagesHandler.update(messagePayload)
        }
        break;
      }
    }
  }
}

