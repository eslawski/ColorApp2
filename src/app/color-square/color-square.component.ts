import { CurrentColorService } from './../current-color.service';
import { ColorCollectionService } from 'app/color-collection.service';
import { Color } from './../shared/color.model';
import { Component, Input } from '@angular/core';

/**
 * Component that represents a square of color that can be interacted with.
 */
@Component({
  selector: 'color-square',
  templateUrl: './color-square.component.html',
  styleUrls: ['./color-square.component.css']
})
export class ColorSquareComponent {
  // Input property for the color object to be displayed
  @Input() color: Color;

/**
 * Constructor
 * @param colorCollectionService 
 * @param CurrentColorService 
 */
  constructor(private colorCollectionService: ColorCollectionService,
   private CurrentColorService: CurrentColorService) { }

   /**
    * Invoked when the user clicks the delete color button. It removes
    * the color from the ColorCollectionService
    */
  onDeleteClicked(color: Color) {
    this.colorCollectionService.deleteColor(color);
  }

  /**
   * Invoked when the user selects this component. It sets this as the
   *  color currently being displayed via the CurrentColorService.
   */
  onColorClicked() {
    this.CurrentColorService.setCurrentColor(this.color);
  }

  /**
   * Obtains the background color for the component.
   */
  getBackgroundColor() {
    return "#" + this.color.hexCode;
  }

}
