import { Component, OnInit } from '@angular/core';
import {
  ColDef,
  IGetRowsParams,
  IServerSideDatasource,
  ServerSideStoreType,
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
      { field: 'symbol', width: 80, filter: 'agTextColumnFilter' },
      {
        field: 'price',
        width: 80,
        filter: 'agNumberColumnFilter',
      },
    ];

    this.gridOptions = {
      rowSelection: 'single',
      cacheBlockSize: 100,
      maxBlocksInCache: 3,
      pagination: true,
    };
  }

  columnDefs: ColDef[] = [];
  public gridOptions: any;
  public serverSideStoreType: ServerSideStoreType = 'partial';

  rowModelType: 'serverSide' = 'serverSide';
  handleError() {}

  getHttpData() {
    this.cryptoListService.getJSON().subscribe((data) => {
      this.rowData = data;
    });
  }

  getData() {
    this.cryptoListService.getJSON().subscribe((data: any) => {
      this.serverSideDatasource = this.createServerSideDatasource();
    });
  }
  onCellValueChanged(params: any) {
    console.log(JSON.stringify(params.value));
  }
  onGridReady(params: any) {
    this.gridApiActive = params.api;
    this.createServerSideDatasource();
  }

  onSearchTextChanged() {
    this.gridApiActive.setQuickFilter(this.searchValue);
  }

  createServerSideDatasource() {
    this.serverSideDatasource = {
      getRows: (params: any) => {
        this.cryptoListService.setFilter(params).subscribe((data: any) => {
          params.success({ rowData: data });
        });
        params.fail();
      },
    };
  }
  // serverData(data: any) {
  //   return {
  //     getRows: (params: any) => {
  //       params.success({ rowData: data });
  //     },
  //   };
  // }
}
