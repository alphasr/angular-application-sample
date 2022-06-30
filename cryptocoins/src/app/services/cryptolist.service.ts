import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Coin } from '../Coin';

@Injectable({
  providedIn: 'root',
})
export class CryptolistService {
  jsonFile = 'assets/mock.json';

  constructor(private http: HttpClient) {}

  getJSON(): Observable<any> {
    return this.http.get(this.jsonFile);
  }
  setFilter(params: any) {
    return this.http.get(this.jsonFile, { params });
  }
}
