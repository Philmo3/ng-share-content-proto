import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicTemplateDirective } from 'src/directive/dynamic-template.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-shareable-plane',
  standalone: true,
  imports: [CommonModule, DynamicTemplateDirective, DragDropModule],
  templateUrl: './shareable-plane.component.html',
  styleUrls: ['./shareable-plane.component.css'],
})
export class ShareablePlaneComponent {

}
