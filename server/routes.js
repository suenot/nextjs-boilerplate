const NextRouter = require('next-routes')
const routes = module.exports = NextRouter()

// routes.add('blog', '/:language/blog')
// routes.add('blog/detail', '/:language/blog/:slug')
// routes.add('index', '/:language')

routes.add({
  name: 'index',
  page: 'index',
  pattern: '/:lang([a-z]{2,2})',
  params: {
    lang: 'en',
  }
})


routes.add({
  name: 'hello',
  page: 'index',
  pattern: '/:lang([a-z]{2,2})/hello',
  params: {
    lang: 'en',
  }
})
