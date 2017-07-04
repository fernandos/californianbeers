import { Component, OnInit } from '@angular/core';
import { BeerService } from '../services/app.beer.service';
import { Beer } from '../types/Beer';

@Component({
    selector: 'search',
    templateUrl: './app.search.component.html',
    styleUrls: ['./app.search.component.scss']
})
export class SearchComponent {

    private searchStr: string;

    public currentSearchBeerList: Beer [];

    public loading: Boolean = false;

    constructor(private _beerService: BeerService) {
    }

    /**
     * Action linked to user typing
     */
    public search() {
        this.loading = true;
        this.currentSearchBeerList = this._beerService.getBeerByName(this.searchStr);
        // just to simulate a loading
        setTimeout(() => { this.loading = false; }, 1000);
    }
}
