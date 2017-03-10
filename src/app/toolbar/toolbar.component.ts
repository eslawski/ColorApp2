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

  constructor(private colorCollectionService : ColorCollectionService) { }

  ngOnInit() {
  }

  onHexStringChange($event) {
    // TODO validate the hex string
    this.hexString = $event;
  }

  onAddClicked() {
    let color = new Color(this.hexString);
    this.colorCollectionService.addColor(color);
  }

}
