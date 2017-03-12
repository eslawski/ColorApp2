import { ColorJumbotronComponent } from './color-jumbotron/color-jumbotron.component';
import { ColorSquareComponent } from './color-square/color-square.component';
import { Injectable } from '@angular/core';
import { Color } from "app/shared/color.model";
import { Subject } from "@angular/core/src/facade/async";


@Injectable()
export class CurrentColorService {
  // Represents the currently selected color, or null if none.
  currentColor: Color;

  // Instead of utilizing shared memory space setup a mechanism by
  // which components can subscribe to color changes.
  colorChange: Subject<Color> = new Subject<Color>();

  constructor() { 
    this.currentColor = null;
  }

  getCurrentColor() {
    return this.currentColor;
  }

  setCurrentColor(color: Color) {
    // Note this is not a deep copy which is why we need to use
    // a subscriber to notify our components of changes.
    this.currentColor = color;
    this.colorChange.next(this.currentColor);
  }

  tintCurrentColor(color: Color) {
    const TINT_FACTOR = 30;
    let red = Math.min(255, color.red + (Math.ceil((255-color.red)/TINT_FACTOR)));
    let green = Math.min(255, color.green + (Math.ceil((255-color.green)/TINT_FACTOR)));
    let blue = Math.min(255, color.blue + (Math.ceil((255-color.blue)/TINT_FACTOR)));
    this.setCurrentColor(new Color(Color.byte2Hex(red) + Color.byte2Hex(green) + Color.byte2Hex(blue)));
  }

  shadeCurrentColor(color: Color) {
    const SHADE_FACTOR = 30;
    let red = Math.max(0, color.red - (Math.ceil((color.red)/SHADE_FACTOR)));
    let green = Math.max(0, color.green - (Math.ceil((color.green)/SHADE_FACTOR)));
    let blue = Math.max(0, color.blue - (Math.ceil((color.blue)/SHADE_FACTOR)));
    this.setCurrentColor(new Color(Color.byte2Hex(red) + Color.byte2Hex(green) + Color.byte2Hex(blue)));
  }

}
