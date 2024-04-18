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

export interface Currency {
  value: CurrencyType
  symbol: CurrencySymbol
}
export interface Settings {
  language: string
  currency: Currency
}
