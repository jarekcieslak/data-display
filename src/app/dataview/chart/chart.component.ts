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


  chart: Chart;
  @ViewChild('chart') chartRef: ElementRef;
  COLORS = ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#3cba9f'];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.marketData.firstChange) {

      if (!!this.marketData) {
        if (!!this.chart) {
          this.chart.destroy();
        }
        const ids = changes.marketData.currentValue.ids;
        const data = changes.marketData.currentValue.data;
        const sampleSize = Math.round(changes.marketData.currentValue.data.length / 40);
        const chartCtx = this.chartRef.nativeElement.getContext('2d');

        const dataSet = this.generateDataset(ids, data, sampleSize);
        const labelSet = this.generateLabelset(changes, sampleSize);

        const chartData = {
          datasets: dataSet,
          labels: labelSet
        };

        this.chart = new Chart(chartCtx, this.getChartOptions(chartData));
      }
    }
  }

  private getChartOptions(chartData) {
    return {
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
    };
  }

  private generateLabelset(changes: SimpleChanges, sampleSize: number) {
    return changes.marketData.currentValue.data
      .map((row, index) => {
        if (index % sampleSize === 0) {
          return row.date.toDateString();
        }
      })
      .filter(item => item !== undefined);
  }

  private generateDataset(ids, data, sampleSize: number) {
    return ids.map((id, idx) => {
      return {
        label: `Instrument ${idx + 1}`,
        data: data.map((row, index) => {
          if (index % sampleSize === 0) {
            return {
              x: row.date,
              y: Math.round(row.values[id] * 100) / 100
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
  }

}
