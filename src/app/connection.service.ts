import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private webSocketSub?: WebSocketSubject<any>

  constructor() { }

  connect(){
    this.webSocketSub = webSocket('')
  }

}
