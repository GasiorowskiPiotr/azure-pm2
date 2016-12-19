import * as http from 'http';

const port = process.env.port || 80;

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {

    response.write("Hello world!");
    response.end();

}).listen(port);