import { Component } from '@angular/core';
import { SearchComponent } from './search/app.search.component';
import { BeerService } from './services/app.beer.service';
import { RestService } from './services/app.rest.service';
import { Beer } from './types/Beer';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Californian Beers';
    subTitle = 'Let\'s talk about beers California!';

    constructor(private beerService: BeerService, private restService: RestService) {
        restService.getBeers().subscribe((beerList: Beer[]) => {
            this.beerService.setBeerList(beerList);
        });
    }
}
