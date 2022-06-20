import { Component, OnInit } from '@angular/core';
import { ColDef, ValueFormatterParams } from 'ag-grid-community';
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
  searchValue: any;
  gridApiActive: any;
  ngOnInit(): void {
    this.columnDefs = [
      {
        field: 'name',
        width: 100,
        editable: true,
        filter: 'agTextColumnFilter',
      },
      { field: 'symbol', width: 80 },
      {
        field: 'price',
        width: 80,
        filter: 'agNumberColumnFilter',
      },
    ];
  }

  columnDefs: ColDef[] = [];
  handleError() {}

  getHttpData() {
    this.cryptoListService.getJSON().subscribe((data) => {
      this.rowData = data;
    });
  }
  onCellValueChanged(params: any) {
    console.log(JSON.stringify(params.value));
  }
  onGridReady(params: any) {
    this.gridApiActive = params.api;
    this.getHttpData();
  }
  onSearchTextChanged() {
    this.gridApiActive.setQuickFilter(this.searchValue);
  }
}
