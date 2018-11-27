import {Component, OnDestroy, OnInit} from '@angular/core';
import {MarketDataService} from '../services/market-data.service';
import {DatapointModel, FilterModel, MarketDataModel} from '../models/marketData.interface';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit, OnDestroy {

  loadingStatus: 'loading' | 'error' | 'data';
  marketData: MarketDataModel;
  originalData: MarketDataModel;
  marketDataSubscription: Subscription;


  constructor(private marketDataService: MarketDataService) {
  }

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.loadingStatus = 'loading';
    this.marketDataSubscription = this.marketDataService
      .getMarketData()
      .subscribe(data => {
        this.marketData = data;
        this.loadingStatus = 'data';
        this.originalData = JSON.parse(JSON.stringify(data));
      }, error => this.loadingStatus = 'error');
  }

  handleReset() {
    this.loadData();
  }

  handleFiltersChange(filters: FilterModel) {
    console.log(this.originalData);
    console.log(this.marketData);
    this.marketData = Object.assign({}, this.originalData, {
      data: this.originalData.data.filter(item => this.rowMatchesFilter(item, filters))
    });
  }

  private rowMatchesFilter(row: DatapointModel, filters: FilterModel): boolean {

    // Filter out dates
    row.date = new Date(row.date);
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

  ngOnDestroy(): void {
    this.marketDataSubscription.unsubscribe();
  }
}
