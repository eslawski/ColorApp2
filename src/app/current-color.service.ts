import { ColorJumbotronComponent } from './color-jumbotron/color-jumbotron.component';
import { ColorSquareComponent } from './color-square/color-square.component';
import { Injectable } from '@angular/core';
import { Color } from "app/shared/color.model";
import { Subject } from "@angular/core/src/facade/async";

/**
 * Stores the color that is currently selected (if any).
 */
@Injectable()
export class CurrentColorService {
  // Represents the currently selected color, or null if none.
  currentColor: Color;

  // Instead of utilizing shared memory space (like we do in ColorCollectionService)
  // setup a mechanism by which components can subscribe to color changes.
  colorChange: Subject<Color> = new Subject<Color>();

/**
 * Constructor.
 */
  constructor() { 
    this.currentColor = null;
  }

  /**
   * Returns the current color.
   */
  getCurrentColor() {
    return this.currentColor;
  }

/**
 * Sets the current color.
 * @param color The new color
 */
  setCurrentColor(color: Color) {
    // Note this is not a deep copy which is why we need to use
    // a subscriber to notify our components of changes.
    this.currentColor = color;
    this.colorChange.next(this.currentColor);
  }

  /**
   * Tints the current color.
   */
  tintCurrentColor() {
    const TINT_FACTOR = 30;
    let red = Math.min(255, this.currentColor.red + (Math.ceil((255-this.currentColor.red)/TINT_FACTOR)));
    let green = Math.min(255, this.currentColor.green + (Math.ceil((255-this.currentColor.green)/TINT_FACTOR)));
    let blue = Math.min(255, this.currentColor.blue + (Math.ceil((255-this.currentColor.blue)/TINT_FACTOR)));
    this.setCurrentColor(new Color(Color.byte2Hex(red) + Color.byte2Hex(green) + Color.byte2Hex(blue)));
  }

  /**
   * Shades the current color.
   */
  shadeCurrentColor() {
    const SHADE_FACTOR = 30;
    let red = Math.max(0, this.currentColor.red - (Math.ceil((this.currentColor.red)/SHADE_FACTOR)));
    let green = Math.max(0, this.currentColor.green - (Math.ceil((this.currentColor.green)/SHADE_FACTOR)));
    let blue = Math.max(0, this.currentColor.blue - (Math.ceil((this.currentColor.blue)/SHADE_FACTOR)));
    this.setCurrentColor(new Color(Color.byte2Hex(red) + Color.byte2Hex(green) + Color.byte2Hex(blue)));
  }

}
