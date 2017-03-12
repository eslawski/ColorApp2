import { Message } from './shared/message-model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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
