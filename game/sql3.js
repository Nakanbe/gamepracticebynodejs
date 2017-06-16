var mysql = require('mysql');
var io = require('socket.io');



var connection = mysql.createConnection({  //資料庫連線
	host: '127.0.0.1',
	user: 'jingcai',
	password: 'kufa88',
	database: 'game',
	timezone: 'Asia/Taipei'  
});


function queryexec(i, callback){
	var str = "SELECT * FROM betgame WHERE bet_ID=" + i ;
	connection.query(str, function(error, results){
		if(error) throw error;
		callback(results);
	});
}

function www(){
	var j = 270;
	for(var i = 270; i < 300; i++){
		var str = "SELECT * FROM betgame WHERE bet_ID=" + i ;
		connection.query(str, function(error, results){
			if(error) throw error;
			
			console.log(j);
			console.log(results);
			j++;
		});
	}
}

www();