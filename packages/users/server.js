const http = require('http');

const port = process.env.PORT || 3001;

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

const server = http.createServer((req, res) => {
  if (req.url === '/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`User service running at http://localhost:${port}/`);
  console.log(`TEST_VARIABLE: ${process.env.TEST_VARIABLE}`);
});
