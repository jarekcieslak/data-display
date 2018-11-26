import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import Chart from 'chart.js';
import {MarketDataModel} from '../models/marketData.interface';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input()
  marketData: MarketDataModel;

  @ViewChild('chart') donut: ElementRef;

  chart: Chart;

  COLORS = ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#3cba9f'];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.marketData.firstChange) {

      if (!!this.marketData && !!this.marketData.data) {
        const ids = changes.marketData.currentValue.ids;
        const data = changes.marketData.currentValue.data;
        const sampleSize = 50;
        const donutCtx = this.donut.nativeElement.getContext('2d');

        const dataSet =
          ids.map((id, idx) => {
            return {
              label: `Instrument ${id}`,
              data: data.map((row, index) => {
                if (index % sampleSize === 0) {
                  return {
                    x: row.date,
                    y: row.values[id]
                  };
                }
              }).filter(item => item !== undefined),
              borderColor: this.COLORS[idx],
              backgroundColor: this.COLORS[idx],
              type: 'line',
              pointRadius: 0,
              fill: false,
              lineTension: 0,
              borderWidth: 3
            };
          });
        const labelSet = changes.marketData.currentValue.data
          .map((row, index) => {
            if (index % sampleSize === 0) {
              return row.date.toDateString();
            }
          })
          .filter(item => item !== undefined);

        console.log(labelSet);
        const chartData = {
          datasets: dataSet,
          labels: labelSet
        };

        this.chart = new Chart(
          donutCtx,
          {
            'type': 'line',
            'data': chartData,
            'options': {
              'responsive': true,
              'tooltips': {
                'mode': 'index',
                'intersect': false,
              },
              'hover': {
                'mode': 'nearest',
                'intersect': true
              },
              'animation': {
                'animateScale': true,
                'animateRotate': false
              }
            }
          }
        );
      }
    }
  }

  ngOnInit() {
  }
}
