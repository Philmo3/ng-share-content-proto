import { environment } from './../environments/environment';

import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private webSocketSub?: WebSocketSubject<any>
  private webSocket$? : Observable<any>

  constructor() { }

  connect(roomName: string){
    this.webSocketSub = webSocket(`${environment.wsUrl}?roomName=${roomName}`)

    this.webSocketSub.subscribe()

    this.webSocket$ = this.webSocketSub.asObservable()
  }

}
