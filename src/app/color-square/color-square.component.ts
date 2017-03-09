import { Color } from './../shared/color.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'color-square',
  templateUrl: './color-square.component.html',
  styleUrls: ['./color-square.component.css']
})
export class ColorSquareComponent implements OnInit {
  @Input() color: Color;

  onColorClicked() {
    alert("color clicked!");
  }

  constructor() { }

  ngOnInit() {
  }

}
