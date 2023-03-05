import { ConnectionService } from '../lib/service/connection.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  constructor(private connectionService: ConnectionService){}

  connect(){
    this.connectionService.connect('test')
  }

  disconnect(){
    this.connectionService.disconnect()
  }

  createElement(){
    this.connectionService.createElement({componentName: 'Colored'})
  }
}
