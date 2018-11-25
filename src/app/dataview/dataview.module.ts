import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCheckboxModule, MatTableModule} from '@angular/material';
import { DisplayComponent } from './display/display.component';
import { TableComponent } from './table/table.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [DisplayComponent, TableComponent, ChartComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule
  ],
  exports: [
    DisplayComponent
  ]
})
export class DataviewModule {
}
