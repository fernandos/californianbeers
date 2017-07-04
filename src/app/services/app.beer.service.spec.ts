import { async, TestBed } from '@angular/core/testing';
import { BeerService } from './app.beer.service';
import { Beer } from '../types/Beer';

describe('Service: BeerService', () => {
    const mockedBeerList: Array<Beer> = [
        {
        'brewery': '21st Amendment Brewery Cafe',
        'city': 'San Francisco',
        'name': '21A IPA',
        'abv': '7.2%',
        'ibu': '0',
        'srm': '0',
        'tags': 'north_american_ale|american_style_india_pale_ale'
        },
        {
        'brewery': '21st Amendment Brewery Cafe',
        'city': 'San Francisco',
        'name': '563 Stout',
        'abv': '5%',
        'ibu': '0',
        'srm': '0',
        'tags': 'north_american_ale|american_style_stout'
        },
        {
        'brewery': '21st Amendment Brewery Cafe',
        'city': 'San Francisco',
        'name': 'Amendment Pale Ale',
        'abv': '5.2%',
        'ibu': '0',
        'srm': '0',
        'tags': 'north_american_ale|american_style_pale_ale'
        },
        {
        'brewery': '21st Amendment Brewery Cafe',
        'city': 'San Francisco',
        'name': 'Bitter American',
        'abv': '3.6%',
        'ibu': '0',
        'srm': '0',
        'tags': 'british_ale|special_bitter_or_best_bitter'
        }
    ];

    const mockedTagByCountList = [
        { name: 'North american ale', count: 3 },
        { name: 'American style india pale ale', count: 1 },
        { name: 'American style stout', count: 1 },
        { name: 'Merican style pale ale', count: 1 },
        { name: 'Special bitter or best bitter', count: 1 },
        { name: 'British ale', count: 1 }
    ];

    let service: BeerService;

    beforeEach(() => {
        service = new BeerService();
        service.setBeerList(mockedBeerList);
    });

    it('should have a beerList attribute', () => {
        expect(service.beerList.value instanceof Array).toBe(true);
    });

    describe('#setBeerList', () => {
        it('#setBeerList should call forms.next', () => {
            spyOn(service.beerList, 'next');
            service.setBeerList(mockedBeerList);

            expect(service.beerList.next).toHaveBeenCalledWith(mockedBeerList);
        });

        it('shuld set the same list', () => {
            expect(service.beerList.value).toEqual(mockedBeerList);
        });
    });

    describe('#getBeerByName', () => {
        it('should be call with the provided list of tag', () => {
            spyOn(service, 'generateMapTagCount');
            service.getBeerByName('21A IPA');
            const tagList = mockedBeerList[0].tags.split('|');
            expect(service.generateMapTagCount).toHaveBeenCalledWith(tagList);
        });

        it('should return the list matching the provided name', () => {
            const beerList = service.getBeerByName('21A IPA');
            // mocking expected result
            const mockedResulList = JSON.parse(JSON.stringify(mockedBeerList[0])); // clone object
            mockedResulList.tagList = [];
            mockedResulList.tagList.push(mockedTagByCountList[0]);
            mockedResulList.tagList.push(mockedTagByCountList[1]);

            expect(beerList).toEqual([mockedResulList]);

        });

        it('should return null if it does NOT find a beer matching the provided name', () => {
            expect(service.getBeerByName('Stella') instanceof Array).toBeTruthy();
            expect(service.getBeerByName(null)).toEqual([]);
            expect(service.getBeerByName('')).toEqual([]);
        });
    });

    describe('#generateMapTagCount', () => {
        it('should return a list with pair (name, count)', () => {
            const tagList = mockedBeerList[0].tags.split('|');
            const tagByCount = service.generateMapTagCount(tagList);
            expect(tagByCount[0]).toEqual(mockedTagByCountList[0]);
            expect(tagByCount[1]).toEqual(mockedTagByCountList[1]);
        });

        it('should return a null list', () => {
            expect(service.generateMapTagCount([])).toEqual([]);
        });
    });

    describe('#getBeerList', () => {
        it('should return the main list of beers', () => {
            service.getBeerList().subscribe(beerList => {
                expect(beerList).toEqual(mockedBeerList);
            })
        });
    });
});
