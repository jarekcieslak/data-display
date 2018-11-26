import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  // Input property with default settings
  @Input()
  marketData: MarketDataModel = {
    ids: [],
    referenceValues: null,
    data: []
  };

  dataSource: MatTableDataSource<Datapoint>;
  dataIds: string[] = [];
  displayedColumns: string[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
  }

  ngOnInit() {
    this.prepareDataForTheTable();
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

    // Enable filtering
    this.enableTableFiltering();
  }

  private enableTableFiltering() {
    this.dataSource.filterPredicate = ((data, filter: string) => {
      return true;
    });
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
