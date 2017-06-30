import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BeerService {

    private searchUrl: string = 'https://vdms-ui.herokuapp.com/api/beers';

    constructor(private _http: Http) {}

    getBeers() {
        return this._http.get(this.searchUrl)
            .map(res => res.json());
    }
}