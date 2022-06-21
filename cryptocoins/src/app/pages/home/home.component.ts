import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  ColDef,
  IServerSideDatasource,
  IServerSideGetRowsRequest,
  ValueFormatterParams,
} from 'ag-grid-community';
import { Coin } from 'src/app/Coin';
import { CryptolistService } from '../../services/cryptolist.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private cryptoListService: CryptolistService,
    private http: HttpClient
  ) {}
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
  rowModelType: any = 'serverSide';
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
    //this.getHttpData();
    this.http.get<any[]>('assets/mock-data.json').subscribe((data) => {
      var fakeServer = createFakeServer(data);
      var datasource = createServerSideDatasource(fakeServer);
      this.gridApiActive!.setServerSideDatasource(datasource);
    });
  }

  onSearchTextChanged() {
    this.gridApiActive.setQuickFilter(this.searchValue);
  }
}

function createServerSideDatasource(server: any): IServerSideDatasource {
  return {
    getRows: (params: any) => {
      var response = server.getData(params.request);
      setTimeout(function () {
        if (response.success) {
          params.success({ rowData: response.rows });
        } else {
          params.fail();
        }
      }, 500);
    },
  };
}
function createFakeServer(allData: any[]) {
  return {
    getData: (request: IServerSideGetRowsRequest) => {
      var requestedRows = allData.slice();
      return {
        success: true,
        rows: requestedRows,
      };
    },
  };
}
