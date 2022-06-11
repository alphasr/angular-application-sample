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
  rowData: Coin[] = [];

  ngOnInit(): void {
    this.getHttpData();
  }

  columnDefs: ColDef[] = [
    { field: 'name', width: 100 },
    { field: 'symbol', width: 80 },
    { field: 'price', width: 80 },
  ];
  handleError() {}

  getHttpData() {
    this.cryptoListService.getJSON().subscribe((data) => {
      this.rowData = data;
    });
  }
}
