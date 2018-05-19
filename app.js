import {index} from './lib/routes/index';
import {camera} from "./lib/routes/camera";
import {campus} from "./lib/routes/campus";
import {channel} from "./lib/routes/channel";
import {directStream} from "./lib/routes/directStream";
import {liveRoom} from "./lib/routes/liveRoom";
import {liveServer} from "./lib/routes/liveServer";
import {room} from "./lib/routes/room";
import {rootServer} from "./lib/routes/rootServer";
import {school} from "./lib/routes/school";
import {server} from "./lib/routes/server";

import {Camera, RootServer, Server, LiveServer, LiveRoom, Campus, Channel, DirectStream, Room, School} from './lib/connectors';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';

var express = require('express');
var app = express();

app.use(cors());
//
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', index);
app.use('/camera', camera);
app.use('/campus', campus);
app.use('/channel', channel);
app.use('/directStream', directStream);
app.use('/liveRoom', liveRoom);
app.use('/liveServer', liveServer);
app.use('/room', room);
app.use('/rootServer', rootServer);
app.use('/school', school);
app.use('/server', server);

// var httpserver = app.listen(3000, function () {
//     var host = server.address().address;
//     var port = server.address().port;
//
//     console.log('Example app listening at http://%s:%s', host, port);
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


/**
 * Module dependencies.
 */
const debug = require('debug')('server:server');
import http from 'http';

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const httpserver = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
httpserver.listen(port);
httpserver.on('error', onError);
httpserver.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = httpserver.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}


// var httpserver = app.listen(1337, function () {
//     var host = httpserver.address().address;
//     var port = httpserver.address().port;
//
//     console.log('Example app listening at http://%s:%s', host, port);
// });

module.exports = app;