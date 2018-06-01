const server = require('./app');

server.listen(process.env.PORT || 8080, function() {
  console.log('The server is listening on port 8080');
});