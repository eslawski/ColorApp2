import { ColorSquareComponent } from './../color-square/color-square.component';
import { Component, OnInit } from '@angular/core';
import { Color } from "app/shared/color.model";
import { ColorCollectionService } from "app/color-collection.service";

/**
 * Component for displaying all the colors in the collection.
 */
@Component({
  selector: 'color-collection',
  templateUrl: './color-collection.component.html',
  styleUrls: ['./color-collection.component.css']
})
export class ColorCollectionComponent implements OnInit {
  // All the colors currently being displayed in the collection.
  colors: Color[];

  /**
   * Constructor
   * @param colorCollectionService
   */
  constructor(private colorCollectionService: ColorCollectionService) {
    // The 'private' keyword above automatically creates a member variable for this class.
  }

  /**
   * Called after angular is done creating this component.
   */
  ngOnInit() {
    // Sets the local variable to the array of colors currently being maintained in the service.
    // Since arrays in javascript are actually references, any changes to the ColorCollectionService
    // will automatically be reflected here.
    this.colors = this.colorCollectionService.getColorCollection();
  }
}
