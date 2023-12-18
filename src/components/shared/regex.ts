export const projectRegexFields = {
  name: /^[A-Za-z0-9 ]+$/,
  email: /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/,
  site: /[(https)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&=]*)/gi,
  socialMedia: /^[a-zA-Z0-9_]+$/,
  discordInvite: /^(https:\/\/)?discord(\.com\/invite\/|\.gg\/)[a-zA-Z0-9\-_]+$/,
  telegramInvite: /^https:\/\/(t\.me|telegram\.me)\/.+$/,
  youtubeVideo: /^(https?:\/\/)?(www\.youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+(&[\w-]+)*(&t=\d+s)?$/,
  youtubeChanel: /^@([a-zA-Z0-9\-.]+)$/
}

export const projectRegexOnKeyDown = {
  email: /[A-Za-z0-9@._-]/,
  noSpecialCharacters: /[A-Za-z0-9 ]/,
  url: /[a-zA-Z0-9-._~:/?#[\]@!$&'()*+;=]/,
  socialMedia: /^[a-zA-Z0-9_]+$/,
  youtubeChanel: /^[a-zA-Z0-9\-.@]$/
}
