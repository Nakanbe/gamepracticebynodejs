//用async
var request = require('request');
var file = require('fs');
var mysql = require('mysql');
var io = require('socket.io');
var http = require('http');
var url = require('url');

var server = http.createServer(function(){
	console.log('Connection!C!o!n!n!e!c!t!i!o!n!');

});

server.listen(8001);

var server_io = io.listen(server);

var connection = mysql.createConnection({  //資料庫連線
	host: '127.0.0.1',
	user: 'jingcai',
	password: 'kufa88',
	database: 'game',
	timezone: 'Asia/Taipei'  
});

server_io.sockets.on('connection', function(socket){
	socket.on('analy', function(){  //收到analy就開始分析網頁
		checksql(connection, function(data1, data2){
			var resultarr = data1.concat(data2);  //合併新增和更新的資料
			var resultJSON = {};
			// console.log(resultJSON);
			if(resultarr.length == 0 ){  //當兩個都沒資料
				socket.emit('result', 'no_insert_or_update');
			}
			else{
				for(var i = 0; i < resultarr.length; i++){  //放到OBJECT裡
					resultJSON[i] = {};
					resultJSON[i] = resultarr[i];
				}
				socket.emit('result', resultJSON);
			}
		});
	});
	//搜尋
	socket.on('search_condition', function(data){  //data.strat_date  data.end_date   data.leaguname  data.ht   data.at  
		gamedb_exec(connection, data, function(result){
			socket.emit('result', result);
		});
	});
});

function analypage(callback){
	var page = 'http://www.kufa88.com/Promotion/jingcai';
	// var page = 'http://127.0.0.1/source4.html';
	console.log ('visiting page' + page);
	var GameData = {};  //存放所有抓到的資料
	request(page, function(error, response, body){
		body = body.replace(/(\r\n|\n|\r)/gm,"");  //移除換行
		var gameTable_regex = /<table class="gameTable">(.*?)<\/table>/ig;
		var gameTable_res = gameTable_regex.exec(body);

		var date_regex = /<span class="moreIcon"><\/span>(.*?) 每次/g;
		var date_result = "";
		var date_matches = [];

		while(date_result = date_regex.exec(gameTable_res[1])){
			date_matches.push(date_result[1]);
		}

		var idx = 0;
		for(var i = 0; i < date_matches.length; i++){
			var more_regex = new RegExp("<tr class=\"moreContent more" + (i+1) + ".*?row\">(.*?)<\/tr>", "g");
			var more_result = "";
			while(more_result = more_regex.exec(gameTable_res[1])){
				GameData[idx] = {};

				var leaguname_regex = /<span class="leagueName".*?>(.*?)\s?<\/span>/g;
				var leaguname_result = leaguname_regex.exec(more_result[1]);

				var ht_regex = /<span class="ht">(.*?)\s?<\/span>/g;
				var ht_result = ht_regex.exec(more_result[1]);

				var at_regex = /<span class="at">(.*?)\s?<\/span>/g;
				var at_result = at_regex.exec(more_result[1]);

				var time_regex = /<td class="time">(.*?)\s?<\/td>/g;
				var time_result = time_regex.exec(more_result[1]);

				var odds_regex = /<span>(.*?)\s+?<input.*?>/g; //多筆資料要迴圈
				var odds_matches = [];
				var odds_result = "";
				
				while(odds_result = odds_regex.exec(more_result[1])){  
					//有無限迴圈出現，注意有g和沒g的差別，沒g只會抓第一個符合的，有g全部都會抓
					odds_matches.push(odds_result[1]);
				}
	      var rq_regex = /<span class="rq.*?>\+?([^\+].*?)\s?<\/span>/g; //多筆資料要迴圈
				var rq_matches = [];
				var rq_result = "";
	      while(rq_result = rq_regex.exec(more_result[1])){
					rq_matches.push(rq_result[1]);
				}
	      var num_regex = /<td class="num".*?>([\d]+).*?<\/td>/g;
	      var num_result = num_regex.exec(more_result[1]);

	      //把資料存進GameData   
	      GameData[idx]['leaguname'] = leaguname_result[1];
	      GameData[idx]['ht'] = ht_result[1];
	      GameData[idx]['at'] = at_result[1];
	      GameData[idx]['time'] = time_result[1];
	      //odds 要迴圈處理
	      if(odds_matches.length < 4){//先判斷有沒有缺資料 
	      	for(var j = 3; j < 6; j++){
	      		odds_matches[j] = '';
	      	}
	      }
	      for(var j = 0 ;j < odds_matches.length; j++){//再放進去
	      	GameData[idx]['odds'+j] = odds_matches[j];
	      }
	      //rq 要迴圈處理
	      if(rq_matches.length < 2){//判斷是否缺資料
	      	rq_matches[1] = rq_matches[0];
	      	rq_matches[0] = null;
	      }
	      for(var j = 0 ;j < rq_matches.length; j++){//再放進去
	      	GameData[idx]['rq'+j] = rq_matches[j];
	      }
	      GameData[idx]['num'] = num_result[1];
	      GameData[idx]['date'] = date_matches[i];
	      idx++;
			}
		}
		callback(GameData);
	});
}

function checksql(connection, callback){
	analypage(function(GameData){
		var j = 0;  //用來比對資料的INDEX
		var insertGameJSON = [];  //用來放新增的資料
		var updateGameJSON = [];  //用來放更新的資料
		var flag = 0;  //是否需要INSERT
		var queryinsert = "INSERT INTO betgame (bet_date, bet_leaguname, bet_ht, bet_at, bet_time, bet_rq0, bet_rq1, bet_odds0, bet_odds1, bet_odds2, bet_odds3, bet_odds4, bet_odds5, bet_num) VALUES ";
		for(var i = 0; i < Object.keys(GameData).length; i++){
			var selectquery = "SELECT " + "bet_odds0 as odds0, " +"bet_odds1 as odds1, " +"bet_odds2 as odds2, " +"bet_odds3 as odds3, " +"bet_odds4 as odds4, " +"bet_odds5 as odds5, " +"bet_num as num, " + "bet_ID " + "FROM " +"betgame " + "WHERE " +"bet_date = '" + GameData[i]['date'] + "' AND " +"bet_leaguname = '" + GameData[i]['leaguname'] + "' AND " +"bet_ht = '" + GameData[i]['ht'] + "' AND " +"bet_at = '" + GameData[i]['at'] + "' AND " +"bet_time = '" + GameData[i]['time'] + "'";
			connection.query(selectquery, function(error, result){  //j表示第幾筆資料  result為query結果
				// console.log(i + " : IN LOOP");
				if(error) throw error;
				if(result == ""){  //先確認有無資料
		  		//沒有就INSERT
		  		queryinsert +=  "('" + GameData[j]['date'] + "','" + GameData[j]['leaguname'] + "','" + GameData[j]['ht'] + "','" + GameData[j]['at'] + "','" +  GameData[j]['time'] + "'," + GameData[j]['rq0'] + "," +GameData[j]['rq1'] + ",'" +GameData[j]['odds0'] + "','" + GameData[j]['odds1'] + "','" +GameData[j]['odds2'] + "','" +GameData[j]['odds3'] + "','" +GameData[j]['odds4'] + "','" +GameData[j]['odds5'] + "'," +GameData[j]['num'] + "),";
		  		flag = 1;
		  		GameData[j]['status'] = 'new'; //增加狀態區分新增和更新 
		  		insertGameJSON.push(GameData[j]);
		  	}
		  	else {
		  		//有就看是否需要更新
		  		// if(result[0]['odds3'] == 'null'){ 
		  		// 	result[0]['odds3'] = null;
		  		// 	result[0]['odds4'] = null;
		  		// 	result[0]['odds5'] = null;
		  		// }
		  		if(result[0]['odds0'] != GameData[j]['odds0'] || result[0]['odds1'] != GameData[j]['odds1'] || result[0]['odds2'] != GameData[j]['odds2'] ||
				     result[0]['odds3'] != GameData[j]['odds3'] || result[0]['odds4'] != GameData[j]['odds4'] || result[0]['odds5'] != GameData[j]['odds5'] || 
				     result[0]['num'] != GameData[j]['num']){
						var queryupdate = "UPDATE " +
				                    		"betgame " +
				                      "SET " +
				                        "bet_odds0='" + GameData[j]['odds0'] + "', "+
				                        "bet_odds1='" + GameData[j]['odds1'] + "', " +
				                        "bet_odds2='" + GameData[j]['odds2'] + "', " +
				                        "bet_odds3='" + GameData[j]['odds3'] + "', " +
				                        "bet_odds4='" + GameData[j]['odds4'] + "', " +
				                        "bet_odds5='" + GameData[j]['odds5'] + "', " +
				                        "bet_num=" + GameData[j]['num'] + 
				                      " WHERE " +
				                        "bet_ID=" + result[0]['bet_ID'];
				    GameData[j]['status'] = 'update'; //增加狀態區分新增和更新 
						updateGameJSON.push(GameData[j]);
						connection.query(queryupdate, function(error){  //跟DB UPDATE
				  		if(error) throw error;
				  	});
					}
				}
				// console.log("J: "+j);
				if(j+1 == Object.keys(GameData).length ){   //GameData裡的資料都處理完
					if(flag == 1){  //是否需要INSERT
						queryinsert = queryinsert.substring(0, queryinsert.length-1);  //跟DB INSERT
						connection.query(queryinsert, function(error){
					  	if(error) throw error;
					  });
					}
				  callback(insertGameJSON, updateGameJSON);
				}
				j++;
			});
			// console.log(i + " : HAHA");
		}
		// console.log("loop finish");
	});
}

function gamedb_exec(connection, data, callback){
	var querystr = '';
	var arr = [];  //放條件之後再合併
	var rstobj = {};  //搜尋結果
	if(data.start_date != '' && data.end_date != ''){
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
		arr.push("bet_ht='" + data.ht + "'");
	}
	if(data.at != ''){
		arr.push("bet_at='" + data.at + "'");
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
										 
    connection.query(querystr, function(error, result){
    	if(error) throw error;
  		if(result == ''){  //沒有搜尋到資料
  			var rststr = "no_search_result"
  			callback(rststr);
  		}
  		else{
    		for(var i = 0; i < result.length; i++){  //有搜尋到就放到rstobj裡
    			rstobj[i] = result[i];
    			rstobj[i]['status'] = result[i]['date'];  
    		}
    		callback(rstobj);
    	}
    });
	}
	else{  //沒有輸入搜尋條件
		var rststr = "no_search_condition";
		callback(rststr);
	}
}