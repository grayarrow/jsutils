import { isObject } from "./skky"

export interface IAssetQuoteResponse {
  symbol: string    // "GME",
  name: string      // "GameStop Corp.",
  price: number     // 203.0601,
  changesPercentage: number   // -4.36,
  change: number    // -9.2499,
  dayLow: number    // 201.35,
  dayHigh: number   // 214.0353,
  yearHigh: number  // 483,
  yearLow: number   // 3.77,
  marketCap: number // 14376655872,
  priceAvg50: number   // 211.59486,
  priceAvg200: number  // 136.80391,
  volume: number    // 2006952,
  avgVolume: number // 9315590,
  exchange: string  // "NYSE",
  open: number      // 214,
  previousClose: number   // 212.31,
  eps: number       // -1.78,
  pe: number        // null,
  earningsAnnouncement: string  // "2021-06-09T16:09:00.000+0000",
  sharesOutstanding: number     // 70800004,
  timestamp: number // 1624635044
}

export interface IAssetQuoteShort {
  symbol: string
  price: number
  volume: number
}

export interface IPolitiscale {
  name: string
  rangeValue: number
}

export interface ICompanyCity {
  date: string
  description: string
  imageUrl: string
  name: string
  scales: IPolitiscale[]
  slug: string
  ticker: string
  website: string
}

export interface IExchangeInfo {
  symbol: string
  name: string
  price: number
  exchange: string
  exchangeShortName: string
}

export interface ICompanyInfo {
  id: string
  exchange: string
  industry: string
  minmov: number
  minmov2: number
  pricescale: number
  profile: ICompanyProfile
  sector: string
  type: string
  val: IExchangeInfo
  createdby: string
  updatedby: string
}

export interface ICompanyProfile {
  symbol: string
  price: number
  beta: number
  volAvg: number
  mktCap: number
  lastDiv: string
  range: string
  changes: number
  companyName: string
  currency: string
  isin: string
  isEtf: boolean
  cusip: string
  exchange: string
  exchangeShortName: string
  industry: string
  website: string
  description: string
  ceo: string
  sector: string
  country: string
  fullTimeEmployees: number
  phone: string
  address: string
  city: string
  state: string
  zip: string
  dcfDiff: string
  dcf: string
  image: string
  ipoDate: string
}

export interface IPlotPricesWithMidpoint {
  symbol: string
  startPrice: number
  startDate: number
  endPrice: number
  endDate: number
  midprice: number
  requestDate: number
}

export interface IPriceHistoricalFull {
  date: string      // "2021-06-24",
  open: number      // 221.16,
  high: number      // 227.45,
  low: number       // 211.6,
  close: number     // 212.31,
  adjClose: number  // 212.31,
  volume: number    // 3866565,
  unadjustedVolume: number  // 3866565,
  change: number    // -8.85,
  changePercent: number     // -4.002,
  vwap: number      // 217.12, Volume Weighted Average Price
  label: string     // "June 24, 21",
  changeOverTime: number    // -0.04002,
  // datetime: number  // 1624507200000 TradePlotter added
}

export interface IPriceHistory {
  // symbol: string
  date: string
  open: number
  low: number
  high: number
  close: number
  volume: number
}

export interface ISymbolPrices {
  symbol: string
  candles: IPlotPricesWithMidpoint[],
  midprice: number
  requestDate: number
}

export class AssetQuoteShort implements IAssetQuoteShort {
  symbol = ''
  price = 0
  volume = 0

  constructor(obj: any) {
    if (isObject(obj)) {
      Object.assign(this, obj)
    }
  }
}

export class CompanyProfile implements ICompanyProfile {
  symbol = ''
  price = 0
  beta = 0
  volAvg = 0
  mktCap = 0
  lastDiv = ''
  range = ''
  changes = 0
  companyName = ''
  currency = ''
  isin = ''
  isEtf = false
  cusip = ''
  exchange = ''
  exchangeShortName = ''
  industry = ''
  website = ''
  description = ''
  ceo = ''
  sector = ''
  country = ''
  fullTimeEmployees = 0
  phone = ''
  address = ''
  city = ''
  state = ''
  zip = ''
  dcfDiff = ''
  dcf = ''
  image = ''
  ipoDate = ''
}

export class ExchangeInfo implements IExchangeInfo {
  symbol = ''
  name = ''
  price = 0
  exchange = ''
  exchangeShortName = ''
}

export class PriceHistoricalResponse implements IPriceHistoricalFull {
  date = '';  // "2021-06-24",
  open = 0;   // 221.16,
  high = 0;   // 227.45,
  low = 0;    // 211.6,
  close = 0;   // 212.31,
  adjClose = 0;   // 212.31,
  volume = 0;   // 3866565,
  unadjustedVolume = 0;   // 3866565,
  change = 0;   // -8.85,
  changePercent = 0;   // -4.002,
  vwap = 0;   // 217.12,
  label = '';   // "June 24, 21",
  changeOverTime = 0;   // -0.04002,
  datetime = 0;   // 1624507200000

  constructor(obj: any) {
    if (isObject(obj)) {
      Object.assign(this, obj)
    }
  }
}

export const CONST_defaultCompanyCity: ICompanyCity = {
  name: '',
  date: '',
  description: '',
  imageUrl: '',
  website: '',
  slug: '',
  ticker: '',
  scales: [],
}
