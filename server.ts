import * as http from 'http'
import * as debug from 'debug'

import app from './app'

const port: string|number|boolean = normalizePort(process.env.PORT || '3000');

const server: http.Server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: number|string): string|number|boolean {
    const port: number = typeof val === 'string' ? parseInt(val) : val;

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind: string = typeof port === 'string'
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

function onListening(): void {
    console.log(`Listening on port ${port}`);
}