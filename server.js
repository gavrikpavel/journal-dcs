const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(jsonServer.rewriter({
  '/api/journal/info': '/info'
}));

server.use(jsonServer.rewriter({
  '/api/journal/pinned-records': '/pinned-records'
}));

server.use(jsonServer.bodyParser)
server.use(function (req, res, next) {
  if (req.method === 'POST') {
    req.method = 'GET'
    req.query = req.body
  }
  // Continue to JSON Server router
  next()
})




server.use(middlewares)
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})

//https://github.com/typicode/json-server/issues/453
