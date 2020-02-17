const NextI18Next = require('next-i18next').default;



// Get languages
const languages = require('./configs/languages').languages;
let localeSubpaths = {}
languages.map(item => {
  const key = item.value
  localeSubpaths[key] = key
})

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['en'],
  otherLanguages: languages.map(item => item.value),
  localeSubpaths,
  // localeSubpaths: {
  //   ru: 'ru',
  //   en: 'en'
  // }
});
