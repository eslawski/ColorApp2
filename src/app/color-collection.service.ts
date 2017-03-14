import { Color } from './shared/color.model';
import { Injectable } from '@angular/core';

/**
 * Maintains an array of colors displayed to the user.
 */
@Injectable()
export class ColorCollectionService {

  // An array that stores all the colors currently in the collection.
  // Since javascript arrays are stored as references in memory
  // any caller of getColorCollection will actually get a reference
  // to the original array and will get instant updates to the collection
  // as it is modified here.
  colors: Color[];

  /**
   * Constructor.
   */
  constructor() {
    this.colors = [];

    // Start of with some initial colors.
    this.colors.push(new Color("FF0000"));
    this.colors.push(new Color("00FF00"));
    this.colors.push(new Color("0000FF"));

  }

  /**
   * Returns all the colors of the collection.
   */
  getColorCollection() {
    return this.colors;
  }

/**
 * Adds a color to the front of the collection.
 */
  addColor(color: Color) {
    this.colors.unshift(color);
  }

/**
 * Deletes the provided color from the collection.
 */
  deleteColor(color: Color) {
    this.colors.splice(this.colors.indexOf(color), 1);
  }

/**
 * Generates colors of the rainbow and adds them to the collection.
 * @param steps The number of colors to create
 */
  generateRainbow(steps: number) {
    const TWO_PI = Math.PI*2;
    for (var i = 0; i < steps; ++i) {
      let red = Math.floor(Math.sin(i*TWO_PI/steps + 0) * 127 + 128);
      let green = Math.floor(Math.sin(i*TWO_PI/steps + TWO_PI/3) * 127 + 128);
      let blue = Math.floor(Math.sin(i*TWO_PI/steps + 2*TWO_PI/3) * 127 + 128);
      this.addColor(new Color(Color.byte2Hex(red) + Color.byte2Hex(green) + Color.byte2Hex(blue)));
    }
  }

/**
 * Removes all colors from the collection.
 */
  clearColors() {
    // Clear the array while maintaining reference to the original array
    this.colors.splice(0, this.colors.length);
  }
}
