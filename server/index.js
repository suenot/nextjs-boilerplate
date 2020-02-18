// eslint-disable-next-line react-hooks/rules-of-hooks

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

const express = require('express')
const next = require('next')
const mobxReact = require('mobx-react')
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const nextI18Next= require('./i18n');
const routes = require('./routes')

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



    async function hack(init) {
      await server.use(nextI18NextMiddleware(nextI18Next));
      init
      await server.use(nextI18NextMiddleware(nextI18Next));
    }

    // use next.js
    await hack(
      server.get('*', (req, res) => {

        getBrowserLang(req, res)

        handle(req, res)
      })
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


function getBrowserLang(req, res) {

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
