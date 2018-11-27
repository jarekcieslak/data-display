import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';
import {DisplayComponent} from './display/display.component';
import {TableComponent} from './table/table.component';
import {ChartComponent} from './chart/chart.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {FiltersComponent} from './filters/filters.component';
import {NoDataPipe} from './no-data.pipe';

@NgModule({
  declarations: [DisplayComponent, TableComponent, ChartComponent, FiltersComponent, NoDataPipe],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatSortModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ],
  exports: [
    DisplayComponent
  ]
})
export class DataviewModule {
}
