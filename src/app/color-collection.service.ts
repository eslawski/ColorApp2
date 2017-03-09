import { Color } from './shared/color.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ColorCollectionService {

  colors: Color[];

  constructor() {
    this.colors = [];
    this.colors.push(new Color("#123456"));
    this.colors.push(new Color("#00FF00"));
    this.colors.push(new Color("#FF0000"));
  }

  getColorCollection() {
    return this.colors;
  }

}
