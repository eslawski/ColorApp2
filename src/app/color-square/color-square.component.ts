import { Color } from './../shared/color.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'color-square',
  templateUrl: './color-square.component.html',
  styleUrls: ['./color-square.component.css']
})
export class ColorSquareComponent implements OnInit {
  color: Color;

  onColorClicked() {
    alert("color clicked!");
  }

  constructor() { }

  ngOnInit() {
    this.color = new Color("#123456");
  }

}
