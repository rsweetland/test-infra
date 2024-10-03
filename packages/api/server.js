const http = require('http');

const port = process.env.PORT || 3000;
const usersServicePort = process.env.USERS_PORT || 3336;

const server = http.createServer((req, res) => {
  if (req.url === '/users' && req.method === 'GET') {
    // Forward the request to the users microservice
    const options = {
      hostname: 'users', // This is the service name in docker-compose
      port: usersServicePort,
      path: '/users',
      method: 'GET'
    };

    const usersReq = http.request(options, (usersRes) => {
      let data = '';

      usersRes.on('data', (chunk) => {
        data += chunk;
      });

      usersRes.on('end', () => {
        res.writeHead(usersRes.statusCode, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    });

    usersReq.on('error', (error) => {
      console.error('Error calling users service:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    });

    usersReq.end();
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`TEST_VARIABLE: ${process.env.TEST_VARIABLE}`);
});
