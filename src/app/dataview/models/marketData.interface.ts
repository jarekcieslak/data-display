interface MarketDataJson {
  instrumentId: number;
  timeSeries: {
    entries: {
      d: string,
      v: number
    }[]
  };
}

interface MarketDataModel {
  ids: number[];
  referenceValues: { [key: number]: number };
  data: Datapoint[];
}

interface Datapoint {
  date: Date;
  values: object;
}

interface FilterModel {
  dateFrom: Date;
  dateTo: Date;
  valueFrom: number;
  valueTo: number;
}
