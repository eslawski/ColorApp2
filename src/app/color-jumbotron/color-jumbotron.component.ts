import { Message } from './../shared/message-model';
import { Color } from './../shared/color.model';
import { CurrentColorService } from './../current-color.service';
import { Component, Input } from '@angular/core';

/**
 * Component that can display the instructions, error messages, or the currently
 * selected color to the user.
 */
@Component({
  selector: 'color-jumbotron',
  templateUrl: './color-jumbotron.component.html',
  styleUrls: ['./color-jumbotron.component.css']
})
export class ColorJumbotronComponent {
  // The color currently being displayed in the jumbotron (if any)
  jumbotronColor: Color;

  // Shows either an error message or the instructions if no color is currently showing.
  @Input() message: Message;
  
  // Subscribes to the color change event of the CurrentColorService
  _subscription;

/**
 * Constructor
 * @param currentColorService 
 */
  constructor(private currentColorService: CurrentColorService) { 
    this.jumbotronColor = this.currentColorService.getCurrentColor();

    // Subscribe the color change event of the CurrentColorService
    this._subscription = currentColorService.colorChange.subscribe((value) => {
      this.jumbotronColor = value;
    });
  }

  /**
   * To avoid possibility of memory leak it is good practice to unsubscribe
   * once the component is destoryed.
   */
  ngOnDestroy() {
    if(this._subscription != null) {
      this._subscription.unsubscribe();
    }
  }

  /**
   * Obtains the background color for the jumbotron. If a color is selected
   * it will be that color. If not display a default gray background.
   */
  getBackgroundColor() {
    if(this.jumbotronColor) {
      // If a color is selected use that as the background.
      return "#" + this.jumbotronColor.hexCode;
    } else {
      // Otherwise show a default color.
      return "#CCCCCC";
    }
  }

/**
 * Invoked when the user clicks the button to tint the current color.
 * Updates the current color accordingly.
 */
  onTintClick(color: Color) {
    this.currentColorService.tintCurrentColor();
  }

  /**
 * Invoked when the user clicks the button to shade the current color.
 * Updates the current color accordingly.
 */
  onShadeClick(color: Color) {
    this.currentColorService.shadeCurrentColor();
  }

}
