var mysql = require('mysql');
var async = require('async');
var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'jingcai',
	password: 'kufa88',
	database: 'game'
});

// connection.connect();

// var str = "SELECT bet_odds0 as odds0, bet_odds1 as odds1, bet_odds2 as odds2, bet_odds3 as odds3, bet_odds4 as odds4, bet_odds5 as odds5, bet_num as num, bet_ID FROM betgame WHERE bet_date = '2017-05-11' AND bet_leaguname = '巴西杯' AND bet_ht = '派桑杜' AND bet_at = '桑托斯' AND bet_time = '08:45'";
// for(var i = 0; i < 30; i++){
// 	connection.query(str, function(error, results){
// 		if(error) {
// 			throw error;
// 		}
// 		if(results != ""){
// 			console.log(results[0]['odds0']);
// 			console.log('-----------------------------------------');
// 			// console.log(results[0].bet_ID);
// 			console.log('=========================================');
// 			console.log(typeof results);
// 		}
// 		else if(results == ""){
// 			console.log("Find Nothing");
// 		}
// 	});
// }



function www(i, callback){
	var obj = {};
	for(i; i < 19; i++){
		queryexec(i, function(results){
			// console.log(i);
			// console.log(results);
			Object.assign(obj, results);
			console.log(obj);
		});	
	}
	callback(obj);
}

function queryexec(i, callback){
	var str = "SELECT * FROM betgame WHERE bet_ID=" + i ;
	connection.query(str, function(error, results){
		if(error) throw error;
		callback(results);
	});
}
a(function(data){
	console.log(data);
});
function a(callback){
	var querystr = [];
	var obj = {};
	for(var i = 1; i < 19; i++){
		var str = "SELECT * FROM betgame WHERE bet_ID=" + i ;
		querystr.push(str);
	}
	console.log(querystr);
	async.eachOf(querystr, function(item,key, callback){
		console.log(item);
		connection.query(item, function(error, results){
			if(error) throw error;
			obj[key] = {};
			Object.assign(obj[key], results);
			callback();
			// console.log(obj);
		});
	}, function(err){
		console.log(err);
		callback(obj);
	});
	
}


// connection.end();

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