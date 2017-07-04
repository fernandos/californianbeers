import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';

// Components
import { AppComponent } from './app.component';
import { SearchComponent } from './search/app.search.component';
import { BeerListComponent } from './beer-list/app.beer-list.component';
import { BubblesComponent } from './bubble/app.bubble.component';
import { BeerService } from './services/app.beer.service';
import { RestService } from './services/app.rest.service';


class MockRestService {
    getBeers() {
        { return { subscribe: () => { return []; } } }
    }
}

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let debugElement: DebugElement;
    let htmlElement: HTMLElement;

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
                BeerService,
                { provide: RestService, useClass: MockRestService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it(`should have as title 'Californian Beers'`, () => {
        expect(component.title).toEqual('Californian Beers');
    });

    it('should render a header tag', () => {
        debugElement = fixture.debugElement.query(By.css('header'));
        htmlElement = debugElement.nativeElement;
        expect(htmlElement.nodeName.toLowerCase()).toEqual('header');
    });

    it('should render a search tag', () => {
        debugElement = fixture.debugElement.query(By.css('search'));
        htmlElement = debugElement.nativeElement;
        expect(htmlElement.nodeName.toLowerCase()).toEqual('search');
    });

    it('should render a footer tag', () => {
        debugElement = fixture.debugElement.query(By.css('footer'));
        htmlElement = debugElement.nativeElement;
        expect(htmlElement.nodeName.toLowerCase()).toEqual('footer');
    });

    it('should render title in a h1 tag', () => {
        debugElement = fixture.debugElement.query(By.css('h1'));
        htmlElement = debugElement.nativeElement;
        expect(htmlElement.textContent).toContain('Californian Beers');
    });

    it('should render subtitle in a p tag', () => {
        debugElement = fixture.debugElement.query(By.css('p'));
        htmlElement = debugElement.nativeElement;
        expect(htmlElement.textContent).toContain('Let\'s talk about beers California!');
    });
});
