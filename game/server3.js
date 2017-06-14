var io = require('socket.io');

var serv_io = io.listen(8001);
var num = 0;

serv_io.sockets.on('connection',function(socket){
	console.log('Connection!');
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