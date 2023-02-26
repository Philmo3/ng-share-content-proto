import { ColoredComponent } from './../components/colored/colored.component';
import { Type } from '@angular/core';
import { ShareableComponentName } from 'src/types/shareable.type';
export const NameToComponentMap: Map<ShareableComponentName, Type<any>> = new Map<ShareableComponentName, Type<any>>()
.set('Colored', ColoredComponent)