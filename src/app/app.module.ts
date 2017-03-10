import { CurrentColorService } from './current-color.service';
import { ColorCollectionService } from './color-collection.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ColorSquareComponent } from './color-square/color-square.component';
import { ColorCollectionComponent } from './color-collection/color-collection.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ColorJumbotronComponent } from './color-jumbotron/color-jumbotron.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorSquareComponent,
    ColorCollectionComponent,
    ToolbarComponent,
    ColorJumbotronComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  // Since the services are defined on the root module all components
  // share the same instances.
  providers: [ColorCollectionService, CurrentColorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
