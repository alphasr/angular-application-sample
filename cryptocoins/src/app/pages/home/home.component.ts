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
    {
      field: 'name',
      width: 100,
      editable: true,
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
        debounceMs: 200,
      },
    },
    { field: 'symbol', width: 80 },
    { field: 'price', width: 80, filter: 'agNumberColumnFilter' },
  ];
  handleError() {}

  getHttpData() {
    this.cryptoListService.getJSON().subscribe((data) => {
      this.rowData = data;
    });
  }
  onCellValueChanged(params: any) {
    console.log(JSON.stringify(params.value));
  }
}
