import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DatapointModel, FilterModel, MarketDataModel} from '../models/marketData.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  @Input()
  marketData: MarketDataModel;

  @Input()
  filters: FilterModel;

  // Internal properties used by the view
  dataSource: MatTableDataSource<DatapointModel>;
  dataIds: string[] = [];
  displayedColumns: string[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
  }

  ngOnInit() {
    // Set initial values for the view
    this.marketData = {
      ids: [],
      referenceValues: null,
      data: []
    };
    // Parse input data and transform it to a way that's consumable by the table component.
    this.prepareDataForTheTable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.marketData.firstChange) {
      this.prepareDataForTheTable();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private prepareDataForTheTable() {

    // Create list of instrumentIDs
    this.dataIds = this.marketData.ids.map(String);

    // Create column headers for the table
    this.displayedColumns = ['Date', ...this.marketData.ids.map(item => '' + item)];

    // Prepare datatable
    this.dataSource = new MatTableDataSource(this.marketData.data);

    // Enable pagination
    this.dataSource.paginator = this.paginator;

    // Enable sorting
    this.enableTableSorting();

  }

  private enableTableSorting() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      const instrumentId = parseInt(property, 10);
      if (!isNaN(instrumentId)) {
        return item.values[instrumentId];
      } else {
        return item.date;
      }
    };
    this.dataSource.sort = this.sort;
  }

}
