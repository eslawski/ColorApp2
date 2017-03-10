import { Injectable } from '@angular/core';
import { Color } from "app/shared/color.model";
import { Subject } from "@angular/core/src/facade/async";


@Injectable()
export class CurrentColorService {
  // Represents the currently selected color, or null if none.
  currentColor: Color;

  // TODO doc
  colorChange: Subject<Color> = new Subject<Color>();

  constructor() { 
    this.currentColor = new Color("#123456");
  }

  getCurrentColor() {
    return this.currentColor;
  }

  setCurrentColor(color: Color) {
    this.currentColor = color;
    this.colorChange.next(this.currentColor);
  }

}
