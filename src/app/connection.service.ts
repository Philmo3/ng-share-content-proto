import { environment } from './../environments/environment';

import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private webSocketSub?: WebSocketSubject<any>
  webSocket$? : Observable<any>

  constructor() { }

  connect(roomName: string){
    if(!this.webSocketSub || this.webSocketSub.closed){
      this.webSocketSub = webSocket(`${environment.wsUrl}?roomName=${roomName}`)
      this.webSocket$ = this.webSocketSub.asObservable()
    }
  }

  disconnect(){
    this.webSocketSub?.unsubscribe()
  }

  createElement(){
    this.webSocketSub?.next({ type: 'create', id: null, componentName: 'none'})
  }
}
