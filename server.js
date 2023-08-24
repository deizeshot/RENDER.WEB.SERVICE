const http = require('http');

const server = http.createServer((req, res) => {
  // Redirect to the specified URL
  res.writeHead(302, { 'Location': 'https://swkgstudio.github.io/' });
  res.end();
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
