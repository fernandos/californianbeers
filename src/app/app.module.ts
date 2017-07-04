import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/app.search.component';
import { BeerListComponent } from './beer-list/app.beer-list.component';
import { BeerService } from './services/app.beer.service';
import { RestService } from './services/app.rest.service';
import { BubblesComponent } from './bubble/app.bubble.component';
import { Beer } from './types/Beer';

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
    providers: [
        BeerService,
        RestService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
