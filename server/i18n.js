const NextI18Next = require('next-i18next').default;



// Get languages
const {languages, langCodes, defaultLang} = require('./configs/languages');
let localeSubpaths = {}
languages.map(item => {
  const key = item.value
  localeSubpaths[key] = key
})

module.exports = new NextI18Next({
  defaultLanguage: defaultLang,
  // otherLanguages: ['en'],
  otherLanguages: langCodes.filter(item => item !== defaultLang),
  localeSubpaths,
  // localeSubpaths: {
  //   ru: 'ru',
  //   en: 'en'
  // }
});
