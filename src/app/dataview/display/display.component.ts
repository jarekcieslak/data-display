import {Component, OnInit} from '@angular/core';
import {MarketDataService} from '../services/market-data.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  loading = false;
  marketData: MarketDataModel;
  filters: FilterModel;

  constructor(private marketDataService: MarketDataService) {
  }

  handleFiltersChange(filters: FilterModel) {
    console.log(filters);
  }

  ngOnInit() {
    this.loading = true;
    this.marketDataService.getMarketData().subscribe(data => {
      this.marketData = data;
      this.loading = false;
    });
  }

}
