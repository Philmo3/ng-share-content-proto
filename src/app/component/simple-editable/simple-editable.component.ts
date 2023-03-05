import { Subscription } from 'rxjs';
import { ConnectionService } from './../../../lib/service/connection.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shareable } from 'src/lib/types/shareable.class';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-simple-editable',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './simple-editable.component.html',
  styleUrls: ['./simple-editable.component.css']
})
export class SimpleEditableComponent extends Shareable implements OnInit, OnDestroy{

  private _name = ''

  @Input() set name(value: string){
    this._name = value

    if(this.simpleForm){
      this.simpleForm.get('name')?.setValue(value, { emitEvent: false })
    }

  }

  simpleForm = this.formBuilder.group({
    name: this._name
  })

  formSubscription?: Subscription

  constructor(
    protected connnectionService: ConnectionService,
    private formBuilder: FormBuilder,
    ){
    super(connnectionService)
  }

  ngOnInit(): void {

    this.formSubscription = this.simpleForm.valueChanges.subscribe(values => {
      this.update('name', values.name)
    })
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe()
  }

}
