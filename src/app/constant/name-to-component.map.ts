import { ColoredComponent } from '../component/colored/colored.component';
import { Type } from '@angular/core';
import { ShareableComponentName } from 'src/lib/types/shareable.type';
import { SimpleEditableComponent } from '../component/simple-editable/simple-editable.component';
export const NameToComponentMap: Map<ShareableComponentName, Type<any>> = new Map<ShareableComponentName, Type<any>>()
.set('Colored', ColoredComponent)
.set('SimpleEditable', SimpleEditableComponent)