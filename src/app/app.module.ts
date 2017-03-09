import { ColorCollectionService } from './color-collection.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ColorSquareComponent } from './color-square/color-square.component';
import { ColorCollectionComponent } from './color-collection/color-collection.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorSquareComponent,
    ColorCollectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  // Since the service is defined on the root module all components
  // share the same instance.
  providers: [ColorCollectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
