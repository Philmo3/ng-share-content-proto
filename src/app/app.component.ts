import { tap } from 'rxjs';
import { ConnectionService } from './connection.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  message$ = this.connectionService.webSocket$

  constructor(private connectionService: ConnectionService){}

  connect(){
    this.connectionService.connect('test')
    this.message$ = this.connectionService.webSocket$?.pipe(tap(msg => console.log(msg)))
  }

  disconnect(){
    this.connectionService.disconnect()
  }

  createElement(){
    this.connectionService.createElement()
  }
}
