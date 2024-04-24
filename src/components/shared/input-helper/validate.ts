import { regexFields } from './regex'

export const handleValidateBirthDate = (data?: string): boolean => {
  if (!data) {
    return true
  }

  const split = data.split('/')
  if (split.length !== 3) {
    return true
  }

  const day = parseInt(split[0], 10)
  const mouth = parseInt(split[1], 10) - 1
  const year = parseInt(split[2], 10)

  const BirthDay = new Date(year, mouth, day)
  const today = new Date()

  let age = today.getFullYear() - BirthDay.getFullYear()
  const m = today.getMonth() - BirthDay.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < BirthDay.getDate())) {
    age--
  }

  return age < 18 || age > 120
}

export function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '')

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return true

  let sum = 0,
    remainder: number

  for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)

  remainder = (sum * 10) % 11

  if (remainder == 10 || remainder == 11) remainder = 0
  if (remainder != parseInt(cpf.substring(9, 10))) return true

  sum = 0

  for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)

  remainder = (sum * 10) % 11

  if (remainder == 10 || remainder == 11) remainder = 0

  if (remainder != parseInt(cpf.substring(10, 11))) return true
  return false
}

export function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, '')
  if (cnpj.length !== 14) return true

  if (/^(\d)\1{13}$/.test(cnpj)) return true

  let length = cnpj.length - 2
  let numbers = cnpj.substring(0, length)
  const digits = cnpj.substring(length)
  let sum = 0
  let pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += Number(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result != Number(digits.charAt(0))) return false

  length = length + 1
  numbers = cnpj.substring(0, length)
  sum = 0
  pos = length - 7
  for (let i = length; i >= 1; i--) {
    sum += Number(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result != Number(digits.charAt(1))) return true

  return false
}

export function isValidPhone(phone: string): boolean {
  const numbers = phone.replace(/\D/g, '')

  const regexPhone = /^(?:[1-9]{2})[2-5][0-9]{7}$|^(?:[1-9]{2})9[6-9][0-9]{7}$/

  return regexPhone.test(numbers)
}

export function isValidEmail(email: string): boolean {
  return !regexFields.email.test(email)
}
