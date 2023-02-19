import { ConnectionService } from './connection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private connectionService: ConnectionService){}

  ngOnInit(): void {
    this.connectionService.connect('test')
  }

}
