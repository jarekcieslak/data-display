import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterModel} from '../models/marketData.interface';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input()
  filters: FilterModel;

  @Output()
  filtersChanged: EventEmitter<FilterModel> = new EventEmitter();

  @Output()
  resetTriggered: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.filters = {
      dateFrom: new Date(Date.UTC(2010, 0, 1, 0, 0, 0)),
      dateTo: new Date(),
      valueFrom: 0,
      valueTo: 500
    };
  }

  reset() {
    this.filters = {
      dateFrom: new Date(Date.UTC(2010, 0, 1, 0, 0, 0)),
      dateTo: new Date(),
      valueFrom: 0,
      valueTo: 500
    };
    this.emitReset();
  }

  emitFilterChange() {
    this.filtersChanged.emit(this.filters);
  }

  emitReset() {
    this.resetTriggered.emit(true);
  }

}
