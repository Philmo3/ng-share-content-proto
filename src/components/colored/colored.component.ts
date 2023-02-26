import { ConnectionService } from './../../app/connection.service';
import { Component, HostListener, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shareable } from 'src/types/shareable.class';

@Component({
  selector: 'app-colored',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './colored.component.html',
  styleUrls: ['./colored.component.css'],
})
export class ColoredComponent extends Shareable{

  @HostListener('click')
  onClick(){
    this.update('color', 'green')
  }

  @Input() color: string = 'red'

  constructor(protected connection: ConnectionService){
    super(connection)
  }
}
