var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'jingcai',
	password: 'kufa88',
	database: 'game'
});

connection.connect();

connection.query("SELECT bet_ID FROM betgame WHERE bet_date >= '2017-06-14'", function(error, results){
	if(error) throw error;
	console.log(results);
	console.log('-----------------------------------------');
	console.log(results[1].bet_ID);
	console.log('=========================================');
	console.log(typeof results);
});

connection.end();

// [ RowDataPacket { bet_ID: 238 },
//   RowDataPacket { bet_ID: 243 },
//   RowDataPacket { bet_ID: 244 },
//   RowDataPacket { bet_ID: 245 },
//   RowDataPacket { bet_ID: 246 },
//   RowDataPacket { bet_ID: 250 },
//   RowDataPacket { bet_ID: 255 },
//   RowDataPacket { bet_ID: 256 },
//   RowDataPacket { bet_ID: 257 },
//   RowDataPacket { bet_ID: 258 } ]
// -----------------------------------------
// object
// =========================================
// object