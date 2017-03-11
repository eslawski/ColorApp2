import { ColorJumbotronComponent } from './color-jumbotron/color-jumbotron.component';
import { ColorSquareComponent } from './color-square/color-square.component';
import { Injectable } from '@angular/core';
import { Color } from "app/shared/color.model";
import { Subject } from "@angular/core/src/facade/async";


@Injectable()
export class CurrentColorService {
  // Represents the currently selected color, or null if none.
  public currentColor: Color;

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

}
