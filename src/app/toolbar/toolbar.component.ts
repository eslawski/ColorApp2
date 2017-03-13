import { CurrentColorService } from './../current-color.service';
import { Color } from './../shared/color.model';
import { ColorCollectionService } from 'app/color-collection.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  hexString: String;
  rainbowSteps: string;

  // Triggers when the user encounters and error or does something to address
  // correct their error.
  @Output() errorStateChanged: EventEmitter<string> = new EventEmitter<string>();

   // Necessary for updating the current color
  _subscription;

  constructor(private colorCollectionService : ColorCollectionService,
   private currentColorService: CurrentColorService) {
      // Subscribe to the color change event
      this._subscription = currentColorService.colorChange.subscribe((color) => {
        if(color != null) {
          this.hexString = color.hexCode;
        }
      });

      // Initialize the rainbow steps drop down to 10
      this.rainbowSteps = "10";

      // Initialize the hexString to the empty string
      this.hexString = "";
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this._subscription != null) {
      this._subscription.unsubscribe();
    }
  }

  clearError() {
    this.errorStateChanged.next(null);
  }

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

  onRainbowClicked() {
    this.colorCollectionService.generateRainbow(parseInt(this.rainbowSteps));
  }

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
