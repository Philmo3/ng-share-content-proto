import { ConnectionService } from './connection.service';
import { Component, ViewChild } from '@angular/core';
import { coloredShare } from 'src/types/shareable.type';
import { ColoredComponent } from 'src/components/colored/colored.component';
import { DynamicTemplateDirective } from 'src/directive/dynamic-template.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  @ViewChild(DynamicTemplateDirective, {static: true}) dynamicTemplate!: DynamicTemplateDirective

  messages$ = this.connectionService.messagesHandler.message$.subscribe((message) => {
    switch(message?.type){
      case 'Create' : {
        this.dynamicTemplate.add(message)
        break
      }
      case 'Update': {
        this.dynamicTemplate.update(message)
        break
      }
    }
  })

  constructor(private connectionService: ConnectionService){}

  connect(){
    this.connectionService.connect('test')
  }

  disconnect(){
    this.connectionService.disconnect()
  }

  createElement(){
    this.connectionService.createElement({componentName: 'Colored'} as coloredShare)
  }
}
