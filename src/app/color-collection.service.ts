import { Color } from './shared/color.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ColorCollectionService {

  colors: Color[];

  constructor() {
    this.colors = [];
    this.colors.push(new Color("123456"));
    this.colors.push(new Color("00FF00"));
    this.colors.push(new Color("FF0000"));
  }

  getColorCollection() {
    return this.colors;
  }

  addColor(color: Color) {
    this.colors.unshift(color);
  }

  deleteColor(color: Color) {
    this.colors.splice(this.colors.indexOf(color), 1);
  }

  generateRainbow(steps: number) {
    const TWO_PI = Math.PI*2;
    for (var i = 0; i < steps; ++i) {
      let red = Math.floor(Math.sin(i*TWO_PI/steps + 0) * 127 + 128);
      let green = Math.floor(Math.sin(i*TWO_PI/steps + TWO_PI/3) * 127 + 128);
      let blue = Math.floor(Math.sin(i*TWO_PI/steps + 2*TWO_PI/3) * 127 + 128);
      this.addColor(new Color(Color.byte2Hex(red) + Color.byte2Hex(green) + Color.byte2Hex(blue)));
    }
  }

  clearColors() {
    // Clear the array while maintaining reference to the original array
    this.colors.splice(0, this.colors.length);
  }
}
