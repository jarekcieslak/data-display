import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// import 'rxjs/add/operator/switchMap';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getMarketData(): Observable<MarketDataModel> {
    return this.http
      .get(`${this.BASE_URL}/market-data`)
      .pipe(map((data: MarketDataJson[]) => this.marketDataMapper(data)));
  }

  // Transforms JSON to structure that could be used by the view
  marketDataMapper(data: MarketDataJson[]): MarketDataModel {

    // List of instrumentIDs
    const instrumentIds = data.map(item => item.instrumentId);

    // Dictionary with reference values (values on first day)
    const referenceValues = data.map(instrument => {
      return {
        id: instrument.instrumentId,
        refVal: instrument.timeSeries.entries[0].v
      };
    }).reduce((acc, row) => {
      acc[row.id] = row.refVal;
      return acc;
    }, {});

    // Transform input data to a format consumable by the view
    let transformed = data
      .map(item => {
        return item.timeSeries.entries.map(entry => {
          return {
            id: item.instrumentId,
            val: entry.v,
            date: entry.d
          };
        });
      })
      .reduce((acc, row) => acc.concat(row), [])
      .reduce((acc, row) => {
        // console.log(row);
        const val = (row.val / referenceValues[row.id]) * 100;
        if (!acc[row.date]) {
          acc[row.date] = [{id: row.id, val}];
        } else {
          acc[row.date] = [...acc[row.date], {id: row.id, val}];
        }
        return acc;
      }, {});

    if (!transformed) {
      return {ids: [], referenceValues: null, data: []};
    }

    transformed = Object
      .entries(transformed)
      .map(item => {
        const items = (item[1] as Array<any>);
        return {
          date: new Date(item[0]),
          values: items.reduce((acc, valItem) => {
            if (!acc[valItem.id]) {
              acc[valItem.id] = valItem.val;
            } else {
              acc[valItem.id] = valItem.val;
            }
            return acc;
          }, {})
        };
      });

    return {
      referenceValues: referenceValues,
      ids: instrumentIds,
      data: (transformed as Datapoint[])
    };
  }
}
