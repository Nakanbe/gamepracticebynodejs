var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'jingcai',
	password: 'kufa88',
	database: 'game'
});

connection.connect();

connection.query('SELECT bet_ID FROM betgame', function(error, results){
	if(error) throw error;
	console.log(results);
	console.log('-----------------------------------------');
	console.log(results[12]);
	console.log('=========================================');
	console.log(typeof results[12]);
});

connection.end();