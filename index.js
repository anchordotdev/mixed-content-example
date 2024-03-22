var http = require('http')
var https = require('https')

var autoCert = require('anchor-pki/auto-cert').autoCert;

var finalhandler = require('finalhandler')
var serveStatic = require('serve-static')

// Serve up current dir
var serve = serveStatic('./')
var app = function (req, res) {
  serve(req, res, finalhandler(req, res))
}

var httpPort = (process.env.HTTP_PORT || 3000)
var httpsPort = process.env.HTTPS_PORT

http.createServer(app).listen(httpPort)

console.log("mixed-content-example app over HTTP: http://localhost:"+httpPort)

// Create HTTPS server if configured
if (httpsPort) {
  https.createServer(autoCert(), app).listen(process.env.HTTPS_PORT)

  console.log("mixed-content-example app over HTTPS: https://mixed-content-example.lcl.host:"+httpsPort)
}
