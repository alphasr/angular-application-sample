import { Component, OnInit } from '@angular/core';
import {
  ColDef,
  IServerSideDatasource,
  IServerSideGetRowsRequest,
} from 'ag-grid-community';
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
  serverSideDatasource: any;
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
  rowModelType: 'serverSide' = 'serverSide';
  handleError() {}

  getHttpData() {
    this.cryptoListService.getJSON().subscribe((data) => {
      this.rowData = data;
    });
  }

  getData() {
    this.cryptoListService.getJSONSSRM().subscribe((data: any) => {
      this.serverSideDatasource = createServerSideDatasource(data.slice());
      return this.serverSideDatasource;
    });
  }
  onCellValueChanged(params: any) {
    console.log(JSON.stringify(params.value));
  }
  onGridReady(params: any) {
    this.gridApiActive = params.api;
    //this.getHttpData();
    //this.getData();
    this.gridApiActive!.setServerSideDatasource(this.getData());
  }

  onSearchTextChanged() {
    this.gridApiActive.setQuickFilter(this.searchValue);
  }
}

function createServerSideDatasource(data: any): IServerSideDatasource {
  return {
    getRows: (params: any) => {
      setTimeout(function () {
        if (params.success) {
          params.success({ rowData: data });
        } else {
          params.fail();
        }
      }, 500);
    },
  };
}
