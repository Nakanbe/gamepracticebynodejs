//用新變數j替代，但還是不行
var request = require('request');
var file = require('fs');
var mysql = require('mysql');

var connection = mysql.createConnection({  //資料庫連線
	host: '127.0.0.1',
	user: 'jingcai',
	password: 'kufa88',
	database: 'game',
	timezone: 'Asia/Taipei'  
});


checksql(connection);

// var page = "http://www.kufa88.com/Promotion/jingcai";

//分析網頁並抓取資料
function analypage(callback){
	var page = 'http://127.0.0.1/source4.html';
	console.log ('visiting page' + page);
	var GameData = {};
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
		// file.writeFile("msg1.txt", date_matches);
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
	      		odds_matches[j] = null;
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
		var queryinsert = "INSERT INTO betgame (bet_date, bet_leaguname, bet_ht, bet_at, bet_time, bet_rq0, bet_rq1, bet_odds0, bet_odds1, bet_odds2, bet_odds3, bet_odds4, bet_odds5, bet_num) VALUES ";
		var j = 0;
		var insertGameJSON = {};
		var updateGameJSON = {};
		for(var i = 0; i < Object.keys(GameData).length; i++){
			var selectquery = "SELECT " + "bet_odds0 as odds0, " +"bet_odds1 as odds1, " +"bet_odds2 as odds2, " +"bet_odds3 as odds3, " +"bet_odds4 as odds4, " +"bet_odds5 as odds5, " +"bet_num as num, " + "bet_ID " + "FROM " +"betgame " + "WHERE " +"bet_date = '" + GameData[i]['date'] + "' AND " +"bet_leaguname = '" + GameData[i]['leaguname'] + "' AND " +"bet_ht = '" + GameData[i]['ht'] + "' AND " +"bet_at = '" + GameData[i]['at'] + "' AND " +"bet_time = '" + GameData[i]['time'] + "'";
			connection.query(selectquery, function(error, result){  //query 太慢了
				if (error) throw error;
		  	//資料有更新就UPDATE
		  	console.log(i);
		  	console.log(result[0]['odds0']);
		  	// console.log(selectquery);
		  	if(result == ""){  //先確認有無資料
		  		//沒有就INSERT
		  		queryinsert +=  "('" + GameData[j]['date'] + "','" + GameData[j]['leaguname'] + "','" + GameData[j]['ht'] + "','" + GameData[j]['at'] + "','" +  GameData[j]['time'] + "'," + GameData[j]['rq0'] + "," +GameData[j]['rq1'] + ",'" +GameData[j]['odds0'] + "','" + GameData[j]['odds1'] + "','" +GameData[j]['odds2'] + "','" +GameData[j]['odds3'] + "','" +GameData[j]['odds4'] + "','" +GameData[j]['odds5'] + "'," +GameData[j]['num'] + "),";
		  		flag = 1;
		  		GameData[j]['status'] = 'new'; //增加狀態區分新增和更新 
		  		Object.assign(insertGameJSON, GameData[i]);
		  	}
		  	else {
		  		//有就看是否需要更新
		  		if(result[0]['odds0'] != GameData[j]['odds0'] || result[0]['odds1'] != GameData[j]['odds1'] || result[0]['odds2'] != GameData[j]['odds2'] ||
				     result[0]['odds3'] != GameData[j]['odds3'] || result[0]['odds4'] != GameData[j]['odds4'] || result[0]['odds5'] != GameData[j]['odds5'] || 
				     result[0]['rq0'] != GameData[j]['rq0'] || result[0]['rq1'] != GameData[j]['rq1']){
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
				                        "bet_ID=" + GameData[j]['bet_ID'];
				    GameData[j]['status'] = 'update'; //增加狀態區分新增和更新 
						Object.assign(updateGameJSON, GameData[i]);
						connection.query(queryupdate, function(error){
				  		if(error) throw error;
				  	});
					}
				}
				if(j == Object.keys(GameData).length && flag == 1){
					connection.query(queryinsert, function(error){
				  	if(error) throw error;
				  });
				}
				j++;
			});
		}
		// while(i < Object.keys(GameData).length){
		// 	var selectquery = "SELECT " + "bet_odds0 as odds0, " +"bet_odds1 as odds1, " +"bet_odds2 as odds2, " +"bet_odds3 as odds3, " +"bet_odds4 as odds4, " +"bet_odds5 as odds5, " +"bet_num as num, " + "bet_ID " + "FROM " +"betgame " + "WHERE " +"bet_date = '" + GameData[i]['date'] + "' AND " +"bet_leaguname = '" + GameData[i]['leaguname'] + "' AND " +"bet_ht = '" + GameData[i]['ht'] + "' AND " +"bet_at = '" + GameData[i]['at'] + "' AND " +"bet_time = '" + GameData[i]['time'] + "'";
		// 	// query_exec(,,function(){
		// 	// 	i++;
		// 	// });
		// 	connection.query(selectquery, function(error, results){  //query 太慢了
		// 		console.log(i);
		// 		if (error) throw error;
		// 		i++;
		// 	});
			// console.log(i);
		// }

		
	});
}
