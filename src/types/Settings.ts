export enum CurrencyType {
  BRL = 'brl',
  USD = 'usd',
  EUR = 'eur'
}

export enum CurrencySymbol {
  BRL = 'R$',
  USD = '$',
  EUR = '€'
}

export type Currency = {
  value: CurrencyType
  symbol: CurrencySymbol
}
export type Settings = {
  language: string
  currency: Currency
}
