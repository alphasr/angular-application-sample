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
      this.serverSideDatasource = this.createServerSideDatasource(data);
    });
  }
  onCellValueChanged(params: any) {
    console.log(JSON.stringify(params.value));
  }
  onGridReady(params: any) {
    this.gridApiActive = params.api;
    this.getData();
  }

  onSearchTextChanged() {
    this.gridApiActive.setQuickFilter(this.searchValue);
  }

  createServerSideDatasource(data: any): IServerSideDatasource {
    return {
      getRows: (params: any) => {
        if (params.success) {
          params.success({ rowData: data });
          const filterModel = {
            price: { filterType: 'number', type: 'equals', filter: '100' },
            name: { filterType: 'text', type: 'contains', filter: 's' },
          };
          this.cryptoListService.setFilter(params, filterModel);
          console.log(params.request.filterModel);
        } else {
          params.fail();
        }
      },
    };
  }
}
