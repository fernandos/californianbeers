import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/app.search.component';
import { BeerListComponent } from './beer/app.beer.component';
import { BeerService } from './services/app.beer.service';
import { BubblesComponent } from './bubble/app.bubble.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    BeerListComponent,
    BubblesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
