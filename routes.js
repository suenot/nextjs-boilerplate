const NextRouter = require('next-routes')
const routes = module.exports = NextRouter()


routes.add({
  name: 'index',
  page: 'index',
  pattern: '/:lang([a-z]{2,2})',
  params: {
    lang: 'en',
  }
})
