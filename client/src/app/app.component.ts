import { Component, OnDestroy, OnInit } from '@angular/core';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, filter, finalize, switchMap, tap } from 'rxjs/operators';

import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  loading = false;
  selectedCity: string;

  findCityByTermInput = new Subject<string>();
  cities$: Observable<string[]>;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities() {
    this.cities$ = concat(
      of([]), // default items
      this.findCityByTermInput.pipe(
        debounceTime(800),
        filter(term => term?.toString().length >= 2),
        tap(() => this.loading = true),
        switchMap(term => this.dataService.getCities$(term)
          .pipe(
            tap((data: any[]) => {
            }),
            catchError((err) => {
              console.log(err);
              alert(err);
              // empty list on error
              return of([]);
            }),
            finalize(() => this.loading = false)
          ))
      )
    );
  }

  onFindCity(term: string) {
    this.findCityByTermInput.next(term);
  }

  onSelectCity(city: string) {
    this.selectedCity = city;
  }

  ngOnDestroy(): void {
    this.findCityByTermInput?.unsubscribe();
  }
}
