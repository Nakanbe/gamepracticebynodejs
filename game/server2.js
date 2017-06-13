var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io');

var server = http.createServer(function(request, response){
	console.log('Connection!C!o!n!n!e!c!t!i!o!n!');
	var path = url.parse(request.url).pathname;
	

	switch (path){
		case '/':
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write('Hello NODE');
			response.end();
			break;
		case '/socket.html':
			fs.readFile(__dirname + path, function(error, data){
				if(error){
					response.writeHead(404);
					response.write('Something ERROR!');
				}
				else{
					response.writeHead(200, {'Content-Type': 'text/html'});
					response.write(data, 'utf8');
				}
				response.end();
			});
			break;
		default:
      response.writeHead(404);
      response.write("opps this doesn't exist - 404");
      response.end();
      break;
	}
});

server.listen(8001);

var serv_io = io.listen(server);
var num = 0;

serv_io.sockets.on('connection',function(socket){
	socket.on('add', function(data){
		add(data.A, data.B, function(num){
			back(socket, num);
		});
	});
});


function add(num1, num2, callback){
	var sum = num1 + num2;
	callback(sum);
}

function back(socket, num3){
	socket.emit('result',{'rst': num3});
}