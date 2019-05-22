var http = require('http');

var server = http.createServer(function (req,res){
}).listen(3000,"192.168.2.193");

console.log('Server running at http://192.168.2.193:3000/');

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
  socket.on('xxx', function(msg){
    console.log('message: ' + msg);
  });
});
