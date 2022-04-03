import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getCities$(term: string) {
    return this.httpClient.get<any>(environment.apiUrl + `/worldcities/${term}`);
  }
}
