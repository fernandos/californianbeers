import { Injectable } from '@angular/core';
import { Beer } from '../types/Beer';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

@Injectable()
export class BeerService {

    beerList = new BehaviorSubject<Array<Beer>>([]);

    /**
     * Given a new list of beer set the main list
     */
    setBeerList(newBeerList: Beer[]) {
        const listWithLowerKey = this.beerResultToLowercase(newBeerList);
        this.beerList.next(listWithLowerKey);
    }

    /**
     * Returns the current list of beers
     */
    getBeerList(): Observable<Beer[]> {
        return this.beerList;
    }

    /**
     * Given a string returns a list with matching beers
     * @param {string} name
     */
    getBeerByName(name: string) {
        let result = [];
        result = this.beerList.value.filter(beer => {
            if (beer.name && name && beer.name.toLowerCase().startsWith(name.toLowerCase())) {
                const currentTags = beer.tags.split('|');
                beer.tagList = this.generateMapTagCount(currentTags);
                return beer;
            }
        });
        return result;
    }

    /**
     * Given an array of strings containing tag's beers return a list of tuplas:
     * [ { name: 'american pale ale', count: 123 } ]
     * @param {tagList} Array
     * @returns {Array}
     */
    generateMapTagCount(tagList) {
        return tagList.map(tagName => {
            const beerByTag = _.filter(this.beerList.value, beer => {
                const currentBeerTags = beer.tags.split('|');
                return currentBeerTags[0] === tagName || currentBeerTags[1] === tagName ;
            });

            tagName = tagName.split('_').join(' ');
            const cleanName = tagName.charAt(0).toUpperCase() + tagName.slice(1);
            return {name: cleanName, count: beerByTag.length};
        });
    }

    /**
     * Given a list of Beer objects, convert all the object's keys to lowercase
     * @param {Array<Beer>} beerResult List of beer objects.
     */
    private beerResultToLowercase(beerResult) {
        return beerResult.map(obj => {
            return _.mapKeys(obj, (v, k: string) => {
                return k.toLowerCase();
            })
        });
    }
}
