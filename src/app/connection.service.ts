import { environment } from './../environments/environment';

import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { Subscription } from 'rxjs';
import { MessagesHandler, socketMessage } from 'src/types/messages.class';
import { ShareableTypeDefinition } from 'src/types/shareableComponent.type';
@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private webSocketSub?: WebSocketSubject<socketMessage>
  private webSocketSubscription? : Subscription
  messagesHandler: MessagesHandler = new MessagesHandler()

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

  createElement(shareable: ShareableTypeDefinition){
    this.webSocketSub?.next({type: 'Create', componentName: shareable.componentName})
  }

  private onNewMessage(messagePayload: socketMessage){
    this.messagesHandler.add(messagePayload)
  }
}

