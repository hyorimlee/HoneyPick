var http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');
const { collectionRouter } = require('./src/routes/collection');

require('dotenv').config()
var isProduction = process.env.NODE_ENV === 'production'

// Create global app object
var app = express()

app.use(cors())

// Normal express config defaults
app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('method-override')())
app.use(express.static(__dirname + '/public'))

app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }))

if (!isProduction) {
  app.use(errorhandler())
}

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI)
} else {
  mongoose.connect(process.env.MONGODB_URI)
  mongoose.set('debug', true)
}

require('./src/models/User');

<<<<<<< HEAD
app.use('/',require('./src/routes'))
// catch 404 and forward to error handler
=======
app.use(require('./src/routes'))
app.use('/collection', collectionRouter)

/// catch 404 and forward to error handler
>>>>>>> ea63f03a648f4256bc6235f7870619aeaf0269e7
app.use(function(req, res, next) {
  var err = new Error('Not Found server')
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack)

    res.status(err.status || 500)

    res.json({'errors': {
      message: err.message,
      error: err
    }})
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }})
})

// finally, let's start our server...
var server = app.listen( process.env.PORT || 8000, function(){
  console.log('Listening on port ' + server.address().port)
})
