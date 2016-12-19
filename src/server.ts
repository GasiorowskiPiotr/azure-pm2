import * as http from 'http';

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {

    response.write("Hello world!");
    response.end();

}).listen(8080);