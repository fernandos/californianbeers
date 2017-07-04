import { Component, Input, OnInit } from '@angular/core';
import { BeerService } from '../services/app.beer.service';
import { Beer } from '../types/Beer';

@Component({
  selector: 'beer-list',
  templateUrl: './app.beer-list.component.html',
  styleUrls: ['./app.beer-list.component.scss']
})
export class BeerListComponent implements OnInit {

    @Input()
    beerList: Beer [];

    constructor() {}

    ngOnInit() { }
}
