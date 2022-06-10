import { Injectable } from '@angular/core';
import { Coin } from '../Coin';
import { CRYPTOS } from '../mock-data-list';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CryptolistService {
  constructor() {}
  getList(): Observable<Coin[]> {
    const cryptos = of(CRYPTOS);
    return cryptos;
  }
}
