import { CurrentColorService } from './../current-color.service';
import { Color } from './../shared/color.model';
import { ColorCollectionService } from 'app/color-collection.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';

/**
 * Toolbar that contains controls for manipulating the color collection.
 */
@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  // The user inputed hex string. Used in two way data binding.
  hexString: string;

  rainbowSteps: string;

  // Triggers when the user encounters an error or does something to address
  // correct their error.
  @Output() errorStateChanged: EventEmitter<string> = new EventEmitter<string>();

   // Used to subscribe this component to color changes. When the color changes we
   // want to populate the input field automatically.
  _subscription;

/**
 * Constructor
 * @param colorCollectionService 
 * @param currentColorService 
 */
  constructor(private colorCollectionService : ColorCollectionService,
              private currentColorService: CurrentColorService) { }

  /**
   * Called after angular is done creating this component.
   */
  ngOnInit() {
    // Subscribes this component to the color change event
    this._subscription = this.currentColorService.colorChange.subscribe((color) => {
      if(color != null) {
        this.hexString = color.hexCode;
      }
    });

    // Initialize the rainbow steps drop down to 10
    this.rainbowSteps = "10";

    // Initialize the hexString to the empty string
    this.hexString = "";
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
  * Fires the errorStateChanged event to notify listeners that there
  * is no longer an active error.
  */
  clearError() {
    this.errorStateChanged.next(null);
  }

 /**
  * Called as the user types into the hex code input field. Every time
  * the user types their input is passivley validated. Once it becomes a
  * valid hex code it informs the CurrentColorService so it can provide
  * the user with instant feedback.
  * @param event The hex string
  */
  onHexStringChange($event) {
    this.hexString = $event.toUpperCase();
    let error = this.validateHexString(this.hexString);

    // Always clear the error right when the user types
    this.clearError();
    
    // As the user types, if the hex color is valid take advantage
    // of the two way binding to show them their color instantly.
    // If it is not valid do nothing, validation will happen once
    // they try to click add.
    if(error == null) {
      this.hexString = this.hexString.toUpperCase(); 
      this.currentColorService.setCurrentColor(new Color(this.hexString));
    } else {
      this.currentColorService.setCurrentColor(null);
    }
  }

/**
 * Invoked once the user clicks the add button. At this point is when the
 * hex string is validated. If it is invalid we need to fire the errorStateChanged
 * event to inform our parent of the error. Otherwise add the valid color to our
 * collection.
 */
  onAddClicked() {
    let error = this.validateHexString(this.hexString);
    if(error == null) {
      // The hex string was formatted properly. Add it to the collection.
      let color = new Color(this.hexString);
      this.colorCollectionService.addColor(color);
    } else {
      // The hex string was invalid. Inform our parent so we can display
      // the error message in the jumbotron.
      this.errorStateChanged.next(error);
    }

  }

  /**
   * Invoked once the user pushes the generate rainbow button to generate
   * colors of the rainbow.
   */
  onRainbowClicked() {
    this.colorCollectionService.generateRainbow(parseInt(this.rainbowSteps));
  }

/**
 * Invoked once the user clicks the clear button to remove all colors from the collection.
 */
  onClearClicked() {
    this.colorCollectionService.clearColors();
    this.currentColorService.setCurrentColor(null);
  }

/**
 * Validates the provided hex string and returns an error message if
 * necessary. Returns null if the hex string is valid.
 */
  validateHexString(hexString: String) {
    if(hexString.length != 6) {
      return "Hex code too short";
    }

      // Validate the characters of the hexString
      let validHexChars = "1234567890ABCDEF";
      for(let i = 0; i < hexString.length; i++) {
        if(validHexChars.indexOf(hexString[i]) == -1) {
          return "Valid characters are 0-9 or A-F";
        }
      }

      // Hex string was valid
      return null;
    }

}
