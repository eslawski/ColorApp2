import { ColorSquareComponent } from './../color-square/color-square.component';
import { Component, OnInit } from '@angular/core';
import { Color } from "app/shared/color.model";
import { ColorCollectionService } from "app/color-collection.service";

@Component({
  selector: 'color-collection',
  templateUrl: './color-collection.component.html',
  styleUrls: ['./color-collection.component.css']
})
export class ColorCollectionComponent implements OnInit {
  colors: Color[];

  // The 'private' keyword automatically creates a member variable for this class.
  constructor(private colorCollectionService: ColorCollectionService) { }

  ngOnInit() {
    this.colors = this.colorCollectionService.getColorCollection();
  }
}
