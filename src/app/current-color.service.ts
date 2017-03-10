import { ColorJumbotronComponent } from './color-jumbotron/color-jumbotron.component';
import { ColorSquareComponent } from './color-square/color-square.component';
import { Injectable } from '@angular/core';
import { Color } from "app/shared/color.model";
import { Subject } from "@angular/core/src/facade/async";


@Injectable()
export class CurrentColorService {
  // Represents the currently selected color, or null if none.
  currentColor: Color;

  // The 'currentColor' does not have a shared memory space across
  // all the components that use it. As a result, changes made
  // in the ColorSquareComponent do not affect the ColorJumbotronComponent.
  // As a result we need to setup this subscriber. Note, this is not
  // necessary for arrays because they are treated as shared memory space
  // in javascript. 
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
