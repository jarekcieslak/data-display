import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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

  constructor() {
  }

  ngOnInit() {
    this.reset();
  }

  reset() {
    this.filters = {
      dateFrom: new Date(Date.UTC(2010, 0, 1, 0, 0, 0)),
      dateTo: new Date(),
      valueFrom: 0,
      valueTo: 100
    };
  }

}
