// eslint-disable-next-line react-hooks/rules-of-hooks

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

const express = require('express')
const next = require('next')
const mobxReact = require('mobx-react')
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const nextI18Next= require('./i18n');
const routes = require('./routes')
const createLocaleMiddleware = require('express-locale');

const {langCodes, defaultLang} = require('./configs/languages')

const app = next({ dev })
// const handle = app.getRequestHandler()
const handle = routes.getRequestHandler(app)

app.prepare()
  .then(async () => {

    mobxReact.useStaticRendering(true)

    const server = express()
    server.use(express.json());


    // use i18next...
    await nextI18Next.initPromise;

    // server.use(createLocaleMiddleware())

    async function hack(init) {
      await server.use(nextI18NextMiddleware(nextI18Next));
      init
      await server.use(nextI18NextMiddleware(nextI18Next));
    }

    // use next.js
    await hack(
      server.get('*', (req, res) => handle(req, res))
    )





    await server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })


// function getBrowserLang(req) {
//
//   // const browserLang = req.locale.language
//   // console.warn('browserLang',browserLang);
//   if(req.query.lang) {
//     console.warn('----');
//     console.warn(req.query.lang);
//   }
//
//   let lang = req.acceptsLanguages(langCodes)
//       lang = lang ? lang : defaultLang
//
//   // console.log('***********')
//   // console.log(lang)
//
//   return lang
// }

// function getBrowserLang(req) {
//
//   const accept = req.acceptsLanguages(langCodes)
//   // if(accept) ...
//
//   const browserLang = req.locale.language
//   console.warn('...lng...',req.query.lng);
//   // console.warn(req.locale);
//   // console.warn(req.ip);
//
//   if(langCodes.includes(browserLang)) {
//     return browserLang;
//   } else {
//      return defaultLang;
//   }
//
// }
