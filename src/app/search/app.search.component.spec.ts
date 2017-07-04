import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Components
import { AppComponent } from '../app.component';
import { SearchComponent } from '../search/app.search.component';
import { BeerListComponent } from '../beer-list/app.beer-list.component';
import { BubblesComponent } from '../bubble/app.bubble.component';
import { BeerService } from '../services/app.beer.service';
import { RestService } from '../services/app.rest.service';
import { Beer } from '../types/Beer';

describe('Component: Search', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;
    let service: BeerService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                SearchComponent,
                BeerListComponent,
                BubblesComponent
            ],
            imports: [
                FormsModule,
                HttpModule
            ],
            providers: [
                { provide: BeerService, useClass: BeerService }
            ]
        })
            .compileComponents().then(() => {
                fixture = TestBed.createComponent(SearchComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();
                service = new BeerService();
            });
    }));

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });

    it('should call `BeerService.getBeerByName`', inject([BeerService], (beerService: BeerService) => {
        spyOn(beerService, 'getBeerByName');
        component.search();
        expect(beerService.getBeerByName).toHaveBeenCalled();
    }));
});
