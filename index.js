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

http.createServer(app).listen(process.env.HTTP_PORT || 3000)

// Create HTTPS server if configured
if (process.env.HTTPS_PORT) {
  https.createServer(autoCert(), app).listen(process.env.HTTPS_PORT)
}
