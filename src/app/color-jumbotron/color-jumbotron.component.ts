import { Message } from './../shared/message-model';
import { Color } from './../shared/color.model';
import { CurrentColorService } from './../current-color.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'color-jumbotron',
  templateUrl: './color-jumbotron.component.html',
  styleUrls: ['./color-jumbotron.component.css']
})
export class ColorJumbotronComponent implements OnInit {
  jumbotronColor: Color;

  // Shows either the error message or the instructions if no color
  // is currently showing.
  @Input() message: Message;
  
  // Necessary for updating the current jumbotronColor
  _subscription;

  constructor(private currentColorService: CurrentColorService) { 
    this.jumbotronColor = this.currentColorService.getCurrentColor();

    // Subscribe to the color change event
    this._subscription = currentColorService.colorChange.subscribe((value) => {
      this.jumbotronColor = value;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if(this._subscription != null) {
      this._subscription.unsubscribe();
    }
  }

  getBackgroundColor() {
    if(this.jumbotronColor) {
      // If a color is selected use that as the background.
      return "#" + this.jumbotronColor.hexCode;
    } else {
      // Otherwise show a default color.
      return "#CCCCCC";
    }
  }

  onTintClick(color: Color) {
    this.currentColorService.tintCurrentColor(this.jumbotronColor);
  }

  onShadeClick(color: Color) {
    this.currentColorService.shadeCurrentColor(this.jumbotronColor);
  }

}
