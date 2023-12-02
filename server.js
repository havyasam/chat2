const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);



app.use(express.static(__dirname + '/public'));
app.use('/public',express.static(__dirname +'/public'));
app.use('/js',express.static(__dirname +'/js'));


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});



io.on('connection', (socket) => {
 
  console.log('a user connected');
  socket.on('message', (msg) => {
    socket.broadcast.emit('message',msg)
  })
});
let userCount = 0;
const userLimit = 2;

io.on('connection', (socket) => {
  if (userCount < userLimit) {
    // Allow the connection
    userCount++;
    // Your connection logic here
  } else {
    // Reject the connection
    socket.disconnect(true);
  console.log("stop u idiot")
  }

  socket.on('disconnect', () => {
    // Decrement the counter when a user disconnects
    userCount--;
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});