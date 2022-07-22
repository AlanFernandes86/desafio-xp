interface IApiStock {
  symbol: string;
  shortName: string;
  longName: string;
  currency: string;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  regularMarketDayRange: string,
  regularMarketChange: number,
  regularMarketChangePercent: number,
  regularMarketTime: Date,
  marketCap: number,
  regularMarketVolume: number,
  regularMarketPreviousClose: number,
  regularMarketOpen: number,
  averageDailyVolume10Day: number,
  averageDailyVolume3Month: number,
  fiftyTwoWeekLowChange: number,
  fiftyTwoWeekLowChangePercent: number,
  fiftyTwoWeekRange: string,
  fiftyTwoWeekHighChange: number,
  fiftyTwoWeekHighChangePercent: number,
  fiftyTwoWeekLow: number,
  fiftyTwoWeekHigh: number,
  twoHundredDayAverage: number,
  twoHundredDayAverageChange: number,
  twoHundredDayAverageChangePercent: number,
  logourl: string,
}

export default IApiStock;
