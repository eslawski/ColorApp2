import { ToolbarComponent } from './../toolbar/toolbar.component';
import { Message } from './../shared/message-model';
import { Component, OnInit } from '@angular/core';

/**
 * Component that displays the jumbotron and toolbar. This component is mostly
 * used to package the jumbotro and toolbar so it is easier to affix them
 * to the top of the screen.
 */
@Component({
  selector: 'color-app-header',
  templateUrl: './color-app-header.component.html',
  styleUrls: ['./color-app-header.component.css']
})
export class ColorAppHeaderComponent implements OnInit {

  // Input property into the jumbotron for displaying either the
  // instructions or an error message.
  message: Message;

 /**
  * Constructor
  */
  constructor() { }

  /**
   * Called after angular is done creating this component.
   */
  ngOnInit() {
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
