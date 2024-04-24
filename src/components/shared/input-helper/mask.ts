export const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const cnpjMask = (value: string) => {
  return value
    .replace(/\D+/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const phoneMask = (value: string) => {
  const number = value.replace(/\D/g, '')

  if (number.length === 10) {
    return number.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  } else if (number.length === 11) {
    return number.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else {
    return value
  }
}
