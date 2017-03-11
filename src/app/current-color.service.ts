import { ColorJumbotronComponent } from './color-jumbotron/color-jumbotron.component';
import { ColorSquareComponent } from './color-square/color-square.component';
import { Injectable } from '@angular/core';
import { Color } from "app/shared/color.model";
import { Subject } from "@angular/core/src/facade/async";


@Injectable()
export class CurrentColorService {
  // Represents the currently selected color, or null if none.
  public currentColor: Color;

  constructor() { 
    this.currentColor = new Color("#123456");
  }

  getCurrentColor() {
    return this.currentColor;
  }

  setCurrentColor(color: Color) {
    // Must perform deep copy of the incoming color otherwise the reference
    // to the current color is lost. An alternative to deep copying the original
    // object would be to use subscribers. See earlier commit. 
    this.currentColor.hexCode = color.hexCode;
    this.currentColor.red = color.red;
    this.currentColor.blue = color.blue;
    this.currentColor.isLight = color.isLight;
  }

}
