// eslint-disable-next-line react-hooks/rules-of-hooks

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

const express = require('express')
const next = require('next')
const mobxReact = require('mobx-react')
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const nextI18Next= require('./i18n');
const routes = require('./routes')

const app = next({ dev })
// const handle = app.getRequestHandler()
const handle = routes.getRequestHandler(app)

app.prepare()
  .then(async () => {

    mobxReact.useStaticRendering(true)

    const server = express()

    // use i18next...
    await nextI18Next.initPromise;
    server.use(nextI18NextMiddleware(nextI18Next));
    server.use(express.json());

    // use next.js
    server.get('*', (req, res) => handle(req, res))

    await server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
