import { Message } from './../shared/message-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'color-app-header',
  templateUrl: './color-app-header.component.html',
  styleUrls: ['./color-app-header.component.css']
})
export class ColorAppHeaderComponent {

  // Input property into the jumbotron for displaying either the
  // instructions or an error message.
  message: Message;

  constructor() {
    this.message = new Message(this.INSTRUCTIONS, false);
  }
  
  /**
   * Handles displaying an error message if necessary.
   * @param errorMessage Error message to display or null
   *        if the error should be cleared.
   */
  handleErrorStateChanged(errorMessage: string) {
    if(errorMessage != null) {
      this.message = new Message(errorMessage, true);
    } else {
      this.message = new Message(this.INSTRUCTIONS, false);
    }
  }

  INSTRUCTIONS = "generate hexidecimal colors quickly!";

}
