import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Coin } from 'src/app/Coin';
import { CryptolistService } from '../../services/cryptolist.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private cryptoListService: CryptolistService) {}

  ngOnInit(): void {
    this.getList();
  }
  list: Coin[] = [];

  columnDefs: ColDef[] = [
    { field: 'name', width: 100, headerName: 'Name' },
    { field: 'symbol', width: 80, headerName: 'Symbol' },
    { field: 'price', width: 80, headerName: 'Price' },
  ];
  getList(): void {
    this.cryptoListService
      .getList()
      .subscribe((cryptos) => (this.list = cryptos));
  }

  rowData = this.list;
}
