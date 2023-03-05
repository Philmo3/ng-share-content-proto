import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { ConnectionService } from '../../../lib/service/connection.service';
import { Component, HostListener, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shareable } from 'src/lib/types/shareable.class';

@Component({
  selector: 'app-colored',
  standalone: true,
  imports: [CommonModule, DragDropModule],
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
