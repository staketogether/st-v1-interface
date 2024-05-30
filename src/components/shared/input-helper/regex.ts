export const projectRegexFields = {
  name: /^[A-Za-z0-9 ]+$/,
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]{2,})?$/,
  site: /[(https)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&=]*)/gi,
  socialMedia: /^(?!.*\.\.)(?!.*__)[a-zA-Z0-9_.]{1,30}$/,
  discordInvite: /^(https:\/\/)?discord(\.com\/invite\/|\.gg\/)[a-zA-Z0-9\-_]+$/,
  telegramInvite: /^https:\/\/(t\.me|telegram\.me)\/.+$/,
  youtubeVideo: /^(https?:\/\/)?(www\.youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+(&[\w-]+)*(&t=\d+s)?$/,
  youtubeChanel: /^@([a-zA-Z0-9\-.]+)$/,
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
}

export const projectRegexOnKeyDown = {
  email: /[A-Za-z0-9@._-]/,
  noSpecialCharacters: /[A-Za-z0-9 ]/,
  url: /[a-zA-Z0-9-._~:/?#[\]@!$&'()*+;=]/,
  socialMedia: /^(?!.*\.\.)(?!.*__)[a-zA-Z0-9_.]{0,30}$/,
  youtubeChanel: /^[a-zA-Z0-9\-.@]$/
}

export const onKeyDownFields = {
  onlyNumbers: /^\d+$/,
  all: /^.*$/
}

export const regexFields = {
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]{2,})?$/,
  phoneMask: /^\([1-9]{2}\) (?:[2-5][0-9]{3}-[0-9]{4}|9[0-9]{4}-[0-9]{4})$/
}
