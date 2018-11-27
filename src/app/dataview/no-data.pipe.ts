import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'noData'
})
export class NoDataPipe implements PipeTransform {

  /**
   * Pipe transforms empty values to '-' in the table.
   * @param value
   * @param args
   */
  transform(value: any, args?: any): any {
    if (value === 0 || value === '0') {
      return '-';
    } else {
      return value;
    }
  }

}
