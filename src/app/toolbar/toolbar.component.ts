import { CurrentColorService } from './../current-color.service';
import { Color } from './../shared/color.model';
import { ColorCollectionService } from 'app/color-collection.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  hexString: String;
  errorMessage: String;
  rainbowSteps: string;

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
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this._subscription != null) {
      this._subscription.unsubscribe();
    }
  }

  onHexStringChange($event) {
    this.hexString = $event;
    this.errorMessage = this.validateHexString(this.hexString);
    
    if(this.errorMessage == null) {
      this.hexString = this.hexString.toUpperCase(); 
      this.currentColorService.setCurrentColor(new Color(this.hexString));
    } else {
      this.currentColorService.setCurrentColor(null);
    }
  }

  onAddClicked() {
    let color = new Color(this.hexString);
    this.colorCollectionService.addColor(color);
  }

  onRainbowClicked() {
    // TODO validate
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
