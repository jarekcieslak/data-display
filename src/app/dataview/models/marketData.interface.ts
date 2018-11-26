export interface MarketDataJson {
  instrumentId: number;
  timeSeries: {
    entries: {
      d: string,
      v: number
    }[]
  };
}

export interface MarketDataModel {
  ids: number[];
  referenceValues: { [key: number]: number };
  data: DatapointModel[];
}

export interface DatapointModel {
  date: Date;
  values: object;
}

export interface FilterModel {
  dateFrom: Date;
  dateTo: Date;
  valueFrom: number;
  valueTo: number;
}
