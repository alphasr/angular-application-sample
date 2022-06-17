import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CryptolistService {
  jsonFile = 'assets/mock-data.json';

  constructor(private http: HttpClient) {}

  getJSON(): Observable<any> {
    return this.http.get(this.jsonFile);
  }
}
