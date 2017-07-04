import { Injectable } from '@angular/core';
import { Beer } from '../types/Beer';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Http, Headers } from '@angular/http';

@Injectable()
export class RestService {

    public searchUrl = 'https://vdms-ui.herokuapp.com/api/beers';

    constructor(private _http: Http) {}

    getBeers() {
        return this._http.get(this.searchUrl)
            .map(res => {
                const json = res.json();
                if (res.ok) {
                    return json as Beer[];
                } else {
                    return this.logError(json);
                }
            });
    }

    private logError(error: any) {
        console.error(error.error);
        throw error;
    }
}
