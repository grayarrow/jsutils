import { isObject } from './skky'

export interface ISymbol {
  symbol: string
}

export interface ISymbolName extends ISymbol {
  name: string
}

export interface ISymbolPrice extends ISymbol {
  price: number
}
export interface ISymbolPriceName extends ISymbolPrice, ISymbolName { }

export interface ISymbolPriceVolume extends ISymbolPrice {
  volume: number
}

export interface ISymbolSearch extends ISymbolName {
  currency: string
  stockExchange: string
  exchangeShortName: string
}

export interface IAssetQuoteResponse extends ISymbolPriceVolume, ISymbolName {
  // symbol: string    // GME,
  // name: string      // GameStop Corp.,
  // price: number     // 203.0601,
  changesPercentage: number   // -4.36,
  change: number    // -9.2499,
  dayLow: number    // 201.35,
  dayHigh: number   // 214.0353,
  yearHigh: number  // 483,
  yearLow: number   // 3.77,
  marketCap: number // 14376655872,
  priceAvg50: number   // 211.59486,
  priceAvg200: number  // 136.80391,
  // volume: number    // 2006952,
  avgVolume: number // 9315590,
  exchange: string  // NYSE,
  open: number      // 214,
  previousClose: number   // 212.31,
  eps: number       // -1.78,
  pe: number        // null,
  earningsAnnouncement: string  // 2021-06-09T16:09:00.000+0000,
  sharesOutstanding: number     // 70800004,
  timestamp: number // 1624635044
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

export interface IExchangeInfo extends ISymbolPriceName {
  exchange: string
  exchangeShortName: string
}

export interface ICompanyExecutive extends ISymbolName {
  yearBorn: number
  pay: number
  currencyPay: string
  title: string
  gender: string
  titleSince: string
}

export interface ICompanyFinancialRatios {
  dividendYielTTM: number
  dividendYielPercentageTTM: number
  peRatioTTM: number
  pegRatioTTM: number
  payoutRatioTTM: number
  currentRatioTTM: number
  quickRatioTTM: number
  cashRatioTTM: number
  daysOfSalesOutstandingTTM: number
  daysOfInventoryOutstandingTTM: number
  operatingCycleTTM: number
  daysOfPayablesOutstandingTTM: number
  cashConversionCycleTTM: number
  grossProfitMarginTTM: number
  operatingProfitMarginTTM: number
  pretaxProfitMarginTTM: number
  netProfitMarginTTM: number
  effectiveTaxRateTTM: number
  returnOnAssetsTTM: number
  returnOnEquityTTM: number
  returnOnCapitalEmployedTTM: number
  netIncomePerEBTTTM: number
  ebtPerEbitTTM: number
  ebitPerRevenueTTM: number
  debtRatioTTM: number
  debtEquityRatioTTM: number
  longTermDebtToCapitalizationTTM: number
  totalDebtToCapitalizationTTM: number
  interestCoverageTTM: number
  cashFlowToDebtRatioTTM: number
  companyEquityMultiplierTTM: number
  receivablesTurnoverTTM: number
  payablesTurnoverTTM: number
  inventoryTurnoverTTM: number
  fixedAssetTurnoverTTM: number
  assetTurnoverTTM: number
  operatingCashFlowPerShareTTM: number
  freeCashFlowPerShareTTM: number
  cashPerShareTTM: number
  operatingCashFlowSalesRatioTTM: number
  freeCashFlowOperatingCashFlowRatioTTM: number
  cashFlowCoverageRatiosTTM: number
  shortTermCoverageRatiosTTM: number
  capitalExpenditureCoverageRatioTTM: number
  dividendPaidAndCapexCoverageRatioTTM: number
  priceBookValueRatioTTM: number
  priceToBookRatioTTM: number
  priceToSalesRatioTTM: number
  priceEarningsRatioTTM: number
  priceToFreeCashFlowsRatioTTM: number
  priceToOperatingCashFlowsRatioTTM: number
  priceCashFlowRatioTTM: number
  priceEarningsToGrowthRatioTTM: number
  priceSalesRatioTTM: number
  dividendYieldTTM: number
  enterpriseValueMultipleTTM: number
  priceFairValueTTM: number
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

export interface ICompanyProfile extends ISymbolPrice {
  // symbol: string
  // price: number
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

export interface IGainerLoser extends ISymbolPrice, ISymbolName {
  change: number
  changesPercentage: number
}

export interface IIpoCalendar extends ISymbol {
  date: string
  company: string
  exchange: string
  actions: string
  shares: number,
  priceRange: string
  marketCap: number
}

export interface IPlotPricesWithMidpoint extends ISymbol {
  startPrice: number
  startDate: number
  endPrice: number
  endDate: number
  midprice: number
  requestDate: number
}

export interface IPriceHistory {
  // symbol: string
  date: string      // 2021-06-24,
  open: number      // 221.16,
  high: number      // 227.45,
  low: number       // 211.6,
  close: number     // 212.31,
  volume: number    // 3866565,
}

export interface IPriceHistoricalFull extends IPriceHistory {
  adjClose: number          // 212.31,
  unadjustedVolume: number  // 3866565,
  change: number            // -8.85,
  changePercent: number     // -4.002,
  vwap: number              // 217.12, Volume Weighted Average Price
  label: string             // June 24, 21,
  changeOverTime: number    // -0.04002,
}

export interface IPriceHistoryWithDateTime extends IPriceHistory {
  datetime: number   // 1624507200000
}

export interface ISymbolPrices extends ISymbol {
  candles: IPriceHistoryWithDateTime[],
  midprice: number
  requestDate: number
}

export class AssetQuoteShort implements ISymbolPriceVolume {
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
  volume = 0    // Not sure about this one
  exchange = ''
  exchangeShortName = ''
}

export class PriceHistoricalResponse implements IPriceHistoricalFull {
  date = '';  // 2021-06-24,
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
  label = '';   // June 24, 21,
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

export interface IRatioCashFlow {
  capitalExpenditureCoverageRatios: string
  cashFlowCoverageRatios: string
  cashPerShare: string
  dividendPayoutRatio: string
  dividendpaidAndCapexCoverageRatios: string
  freeCashFlowOperatingCashFlowRatio: string
  freeCashFlowPerShare: string
  operatingCashFlowPerShare: string
  operatingCashFlowSalesRatio: string
  payoutRatio: string
  receivablesTurnover: string
  shortTermCoverageRatios: string
}

export interface IRatioDebt {
  cashFlowToDebtRatio: string
  companyEquityMultiplier: string
  debtEquityRatio: string
  debtRatio: string
  interestCoverage: string
  longtermDebtToCapitalization: string
  totalDebtToCapitalization: string
}

export interface IRatioInvestmentValuation {
  dividendYield: string
  enterpriseValueMultiple: string
  priceBookValueRatio: string
  priceCashFlowRatio: string
  priceEarningsRatio: string
  priceEarningsToGrowthRatio: string
  priceFairValue: string
  priceSalesRatio: string
  priceToBookRatio: string
  priceToFreeCashFlowsRatio: string
  priceToOperatingCashFlowsRatio: string
  priceToSalesRatio: string
  receivablesTurnover: string
}

export interface IRatioLiquidity {
  cashConversionCycle: string
  cashRatio: string
  currentRatio: string
  daysOfInventoryOutstanding: string
  daysOfPayablesOutstanding: string
  daysOfSalesOutstanding: string
  operatingCycle: string
  quickRatio: string
}

export interface IRatioOperatingPerformance {
  assetTurnover: string
  fixedAssetTurnover: string
  inventoryTurnover: string
  payablesTurnover: string
  receivablesTurnover: string
}

export interface IRatioProfitability {
  eBITperRevenue: string
  eBTperEBIT: string
  effectiveTaxRate: string
  grossProfitMargin: string
  nIperEBT: string
  netProfitMargin: string
  operatingProfitMargin: string
  pretaxProfitMargin: string
  returnOnAssets: string
  returnOnCapitalEmployed: string
  returnOnEquity: string
}

export interface IRatio extends ISymbol {
  date: string
  period: string
  currentRatio: number
  quickRatio: number
  cashRatio: number
  daysOfSalesOutstanding: number
  daysOfInventoryOutstanding: number
  operatingCycle: number
  daysOfPayablesOutstanding: number
  cashConversionCycle: number
  grossProfitMargin: number
  operatingProfitMargin: number
  pretaxProfitMargin: number
  netProfitMargin: number
  effectiveTaxRate: number
  returnOnAssets: number
  returnOnEquity: number
  returnOnCapitalEmployed: number
  netIncomePerEBT: number
  ebtPerEbit: number
  ebitPerRevenue: number
  debtRatio: number
  debtEquityRatio: number
  longTermDebtToCapitalization: number
  totalDebtToCapitalization: number
  interestCoverage: number
  cashFlowToDebtRatio: number
  companyEquityMultiplier: number
  receivablesTurnover: number
  payablesTurnover: number
  inventoryTurnover: number
  fixedAssetTurnover: number
  assetTurnover: number
  operatingCashFlowPerShare: number
  freeCashFlowPerShare: number
  cashPerShare: number
  payoutRatio: number
  operatingCashFlowSalesRatio: number
  freeCashFlowOperatingCashFlowRatio: number
  cashFlowCoverageRatios: number
  shortTermCoverageRatios: number
  capitalExpenditureCoverageRatio: number
  dividendPaidAndCapexCoverageRatio: number
  dividendPayoutRatio: number
  priceBookValueRatio: number
  priceToBookRatio: number
  priceToSalesRatio: number
  priceEarningsRatio: number
  priceToFreeCashFlowsRatio: number
  priceToOperatingCashFlowsRatio: number
  priceCashFlowRatio: number
  priceEarningsToGrowthRatio: number
  priceSalesRatio: number
  dividendYield: number
  enterpriseValueMultiple: number
  priceFairValue: number
}

export interface IFinancialRatios {
  date: string
  cashFlowIndicatorRatios: IRatioCashFlow
  debtRatios: IRatioDebt
  investmentValuationRatios: IRatioInvestmentValuation
  liquidityMeasurementRatios: IRatioLiquidity
  operatingPerformanceRatios: IRatioOperatingPerformance
  profitabilityIndicatorRatios: IRatioProfitability
}

export interface IFinancialRatiosResponse extends ISymbol {
  ratios: IFinancialRatios[]
}
