import { Component, OnInit } from '@angular/core';
import { BeerService } from '../services/app.beer.service';
import { Beer } from '../types/Beer';
import * as _ from "lodash";

@Component({
  selector: 'search',
  templateUrl: './app.search.component.html',
  styleUrls: ['./app.search.component.scss'],
  providers: [ BeerService ]
})
export class SearchComponent implements OnInit {
    private searchStr: string;

    private allBeers: Beer [];

    private currentBeerList: Beer [];

    private allBeerByTag = [];
    
    private beersByTagCount = [];

    private loading: Boolean = false;

    constructor(private _beerService: BeerService) {}

    ngOnInit() {
        this._beerService.getBeers()
             .subscribe(beerResult => this.initilize(beerResult));
    }

    private initilize(beerResult: Beer[]) {
        this.allBeers = beerResult;
        this.allBeerByTag = this.generateBeerByTagList(beerResult);
        this.beersByTagCount = _.keys(this.allBeerByTag)
            .map((k) => {
                return { name: k, count: this.allBeerByTag[k].length }
            });
    }

    private generateBeerByTagList(beers: Beer[]) {
        beers.forEach(beer => {
            // generates a array of tagas
            let currentBeerTags = beer.Tags.split('|');
            this.addBeerToTagList(this.allBeerByTag, beer, currentBeerTags);
        });

        return this.allBeerByTag;
    }

    private addBeerToTagList(allBeerByTag: Array<Object>, beer: Beer, beerTags: string[]) {
        beerTags.forEach((tag: string ) => {
            // if the tag doesn't exist => it's added
            if (allBeerByTag[tag] == undefined) {
                allBeerByTag[tag] = [beer]; // creates a new beer's array for current tag
            } else {
                allBeerByTag[tag].push(beer); // beer's array exist => just push 
            }
        });
    }

    private search() {
        this.loading = true;
        this.filterByName(this.searchStr);
    }

    private filterByName(name: string) {
        this.currentBeerList = this.allBeers
            .filter(beer => {
                if (beer.Name && beer.Name.toLocaleLowerCase().startsWith(name)) {
                    let currentTags = beer.Tags.split("|");
                    beer.TagList = this.generateTagList(currentTags);
                    return beer;
                }
            });
        // just to simulate a loading
        setTimeout(() => {this.loading = false;}, 1000);
    }

    private generateTagList(tagList) {
         return tagList.map(tagName => {
                let beerByTag = this.allBeerByTag[tagName];
                tagName = tagName.split("_").join(" ");
                let cleanName = tagName.charAt(0).toUpperCase() + tagName.slice(1);
                return {name: cleanName, count: beerByTag.length};
            });
    }

    private filterByTag(tag: string) {
        this.currentBeerList = this.allBeers
            .filter(list => {
                return list.Tags && list.Tags.toLocaleLowerCase().startsWith(tag)
            });
    }
}
