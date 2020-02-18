const {langCodes, defaultLang} = require('./configs/languages')


function redirectByLang(req, res) {

  const browserLang = req.headers['accept-language'].split(',')[3].split(';')[0]
  const pathname = req._parsedUrl.pathname
  let patharr = pathname.split('/')

  if(pathname == '/') {
    const redirectLang = langCodes.includes(browserLang) ? browserLang : defaultLang

    res.redirect(`/${redirectLang}`);
  }

  if(patharr.length == 2 && patharr[1].length == 2) {

    const pathLang = patharr[1]
    const redirectLang = langCodes.includes(browserLang) ? browserLang : defaultLang

    if(!langCodes.includes(pathLang)) {

      patharr[1] = redirectLang
      patharr = patharr.join('/')

      res.redirect(patharr);

    }

  }
}


module.exports = {
  redirectByLang,
}
