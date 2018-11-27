import {Component, OnInit} from '@angular/core';
import {MarketDataService} from '../services/market-data.service';
import {DatapointModel, FilterModel, MarketDataModel} from '../models/marketData.interface';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  loadingStatus = 'loading';
  marketData: MarketDataModel;

  constructor(private marketDataService: MarketDataService) {
  }

  handleReset() {
    this.loadData();
  }

  handleFiltersChange(filters: FilterModel) {
    this.marketData = Object.assign({}, this.marketData, {
      data: this.marketData.data.filter(item => this.rowMatchesFilter(item, filters))
    });
  }

  ngOnInit() {
    this.loadingStatus = 'loading';
    this.loadData();
  }

  private loadData() {
    return this.marketDataService.getMarketData().subscribe(data => {
      this.marketData = data;
      this.loadingStatus = 'data';
    }, error => {
      this.loadingStatus = 'error';
    });
  }

  private rowMatchesFilter(row: DatapointModel, filters: FilterModel): boolean {

    // Filter out dates
    if (row.date <= filters.dateTo && row.date >= filters.dateFrom) {

      // Filter out values
      for (const key in row.values) {
        if (!!key) {
          if (row.values.hasOwnProperty(key)) {
            const val = row.values[key];
            if (val > filters.valueTo || val < filters.valueFrom) {
              row.values[key] = 0;
            }
          }

        }
      }
      const sum = Object.entries(row.values).reduce((acc, item) => acc += item[1], 0);
      return !!sum;
    } else {
      return false;
    }
  }

}
