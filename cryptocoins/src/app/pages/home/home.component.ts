import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  columnDefs: ColDef[] = [
    { field: 'Name' },
    { field: 'Symbol' },
    { field: 'Price' },
  ];

  rowData = [
    { Name: 'Bitcoin', Symbol: 'BTC', Price: 35000 },
    { Name: 'Ethereum', Symbol: 'ETH', Price: 3200 },
    { Name: 'Gala', Symbol: 'GAL', Price: 1.5 },
  ];
}
