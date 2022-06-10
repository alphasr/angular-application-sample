import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { CRYPTOLIST } from 'src/app/mock-data-list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  columnDefs: ColDef[] = [
    { field: 'name', width: 100, headerName: 'Name' },
    { field: 'symbol', width: 80, headerName: 'Symbol' },
    { field: 'price', width: 80, headerName: 'Price' },
  ];

  rowData = CRYPTOLIST;
}
