var mysql = require('mysql');
var io = require('socket.io');

var server_io = io.listen(8001);

var connection = mysql.createConnection({  //資料庫連線
	host: '127.0.0.1',
	user: 'jingcai',
	password: 'kufa88',
	database: 'game',
	timezone: 'Asia/Taipei'  
});

// {"strat_date": "2017-06-14",
//  "end_date": "2017-06-14",
//  "leaguname": "世界杯预",
//  "ht": "XXX",
//  "at": "XXX"}

server_io.sockets.on('connection', function(socket){
	// console.log('Connection!');
	socket.on('search_condition', function(data){  //data.strat_date  data.end_date   data.leaguname  data.ht   data.at  
		// console.log(data['start_date']);
		// console.log(data.start_date);
		gamedb_exec(connection, data, function(result){
			socket.emit('result', result);
		});
	});
});

// var data = {'start_date': '2017-06-14',
//  						'end_date': '',
// 					  'leaguname': '',
// 					  'ht': '',
// 					  'at': ''};

// console.log(data.start_date);
// console.log(data['start_date']);

// var result = gamedb_exec(connection, data, function(result){
// 	console.log(result);
// });


function gamedb_exec(connection, data, callback){
	var querystr = '';
	var arr = [];
	var rstobj = {};
	if(data.strat_date != '' && data.end_date != ''){
		arr.push("bet_date>='" + data.start_date + "'");
		arr.push("bet_date<='" + data.end_date + "'");
	}
	else if(data.start_date == '' && data.end_date != ''){
		arr.push("bet_date='" + data.end_date + "'");
	}
	else if(data.start_date != '' && data.end_date == ''){
		arr.push("bet_date='" + data.start_date + "'");
	}
	if(data.leaguname != ''){
		arr.push("bet_leaguname='" + data.leaguname + "'");
	}
	if(data.ht != ''){
		arr.push("bet_ht=" + data.ht + "'");
	}
	if(data.at != ''){
		arr.push("bet_at" + data.at + "'");
	}
	querystr = arr.join(" AND ");
	if(querystr != ''){
		querystr = "SELECT " +
											"bet_date as " + "date, "+ 
											"bet_leaguname as leaguname, " +
											"bet_ht as ht, " + 
											"bet_at as at, " + 
											"bet_time as " + "time, " + 
											"bet_rq0 as rq0, " + 
											"bet_rq1 as rq1, " + 
											"bet_odds0 as odds0, " +
											"bet_odds1 as odds1, " +
											"bet_odds2 as odds2, " +
											"bet_odds3 as odds3, " +
											"bet_odds4 as odds4, " +
											"bet_odds5 as odds5, " +
											"bet_num as num "+
										 "FROM "+
										 	"betgame "+
										 "WHERE " + querystr + " ORDER BY date, time";
		// console.log(querystr);
    connection.query(querystr, function(error, result){
    	if(error) throw error;
    	else{
    		for(var i = 0; i < result.length; i++){
    			rstobj[i] = result[i];
    			rstobj[i]['status'] = result[i]['date'];  //
    		}
    		callback(rstobj);
    	}
    });
	}
}
//connection.query("SELECT bet_ID FROM betgame WHERE bet_date >= '2017-06-14'", function(error, results){});
//connection.end();