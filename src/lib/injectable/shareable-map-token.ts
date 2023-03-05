
import { InjectionToken, Type } from "@angular/core";
import { Shareable } from "../types/shareable.class";

export const SHAREABLE_MAP_TOKEN = new InjectionToken<Map<string, Type<Shareable>>>('The map use to find what component to create')