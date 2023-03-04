import { environment } from './../environments/environment';

import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { Subscription } from 'rxjs';
import { MessagesHandler, socketMessage } from 'src/types/messages.class';
import { ShareableComponent } from 'src/types/shareable.type';
@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private webSocketSub?: WebSocketSubject<socketMessage>
  private webSocketSubscription? : Subscription
  messagesHandler: MessagesHandler = new MessagesHandler()

  clientId = 1

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

  private onNewMessage(messagePayload: socketMessage){
    console.log(messagePayload)
    if(messagePayload.inputs){
      messagePayload.inputs = new Map(Object.entries(messagePayload.inputs))
    }
    switch(messagePayload.type){
      case 'Create' : {
        this.messagesHandler.add(messagePayload)
        break;
      }

      case 'Update' : {
        this.messagesHandler.update(messagePayload)
        break;
      }
    }
  }
}

