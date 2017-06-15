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

connection.connect();

checksql(connection, function(data1, data2){
	file.writeFile("msg.txt", JSON.stringify(data1));
	file.writeFile("msg1.txt", JSON.stringify(data2));
});

// var page = "http://www.kufa88.com/Promotion/jingcai";

//分析網頁並抓取資料
function analypage(callback){
	var page = 'http://127.0.0.1/source4.html';
	console.log ('visiting page' + page);
	var GameData = {};
	request(page, function(error, response, body){
	// console.log(typeof body);
		body = body.replace(/(\r\n|\n|\r)/gm,"");  //移除換行
		var gameTable_regex = /<table class="gameTable">(.*?)<\/table>/ig;
		var gameTable_res = gameTable_regex.exec(body);
		// file.writeFile("msg.txt", gameTable_res[1]);
		// console.log(typeof gameTable_res[1]);

		var date_regex = /<span class="moreIcon"><\/span>(.*?) 每次/g;
		var date_result = "";
		var date_matches = [];
		// var date_result = date_regex[Symbol.match](gameTable_res[1]); 
		// console.log();
		//for(var date_matches = []; date_result = date_regex.exec(gameTable_res[1]); date_matches.push(date_result));
		while(date_result = date_regex.exec(gameTable_res[1])){
			date_matches.push(date_result[1]);
		}
		// file.writeFile("msg1.txt", date_matches);
		var idx = 0;
		for(var i = 0; i < date_matches.length; i++){
			//preg_match_all("/<tr class=\"moreContent more" . "$i" . ".*?row\">(.*?)<\/tr>/", $head[1][0], $tr);
			// var more_regex = "/<tr class=\"moreContent more" + i + ".*?row\">(.*?)<\/tr>/g";
			// var more_regex = more_str;
			var more_regex = new RegExp("<tr class=\"moreContent more" + (i+1) + ".*?row\">(.*?)<\/tr>", "g");
			var more_result = "";
			// var more_result = more_regex.exec(gameTable_res[1]);
			// console.log(more_result);
			while(more_result = more_regex.exec(gameTable_res[1])){
				GameData[idx] = {};
				// preg_match_all("/<span class=\"leagueName\".*?>(.*?)\s?<\/span>/", $value, $leagueName);
				var leaguname_regex = /<span class="leagueName".*?>(.*?)\s?<\/span>/g;
				var leaguname_result = leaguname_regex.exec(more_result[1]);
				// console.log(leaguname_regex.exec(more_result[1])[0]);
				// console.log(leaguname_result[1]);
				// preg_match_all("/<span class=\"ht\">(.*?)\s?<\/span>/", $value, $ht);
				var ht_regex = /<span class="ht">(.*?)\s?<\/span>/g;
				var ht_result = ht_regex.exec(more_result[1]);
				// console.log(ht_result[1]);
				// preg_match_all("/<span class=\"at\">(.*?)\s?<\/span>/", $value, $at);
				var at_regex = /<span class="at">(.*?)\s?<\/span>/g;
				var at_result = at_regex.exec(more_result[1]);
				// console.log(at_result[1]);
				// preg_match_all("/<td class=\"time\">(.*?)\s?<\/td>/", $value, $time);
				var time_regex = /<td class="time">(.*?)\s?<\/td>/g;
				var time_result = time_regex.exec(more_result[1]);
				// console.log(time_result[1]);
				// preg_match_all("/<span>(.*?)\s+?<input.*?>/", $value, $odds);
				var odds_regex = /<span>(.*?)\s+?<input.*?>/g; //多筆資料要迴圈
				var odds_matches = [];
				var odds_result = "";
				// for(var odds_matches = []; odds_result = odds_regex.exec(more_result[1]); odds_matches.push(odds_result[1])){console.log(odds_result[1]);}
				while(odds_result = odds_regex.exec(more_result[1])){  
					//有無限迴圈出現，注意有g和沒g的差別，沒g只會抓第一個符合的，有g全部都會抓
					// console.log(odds_result[0]);
					odds_matches.push(odds_result[1]);
					// console.log(odds_result[1]);
				}
	      // preg_match_all("/<span class=\"rq.*?>\+?([^\+].*?)\s?<\/span>/", $value, $rq);
	      var rq_regex = /<span class="rq.*?>\+?([^\+].*?)\s?<\/span>/g; //多筆資料要迴圈
				var rq_matches = [];
				var rq_result = "";
	      while(rq_result = rq_regex.exec(more_result[1])){
					rq_matches.push(rq_result[1]);
					// console.log(rq_result[1]);
				}
	      // preg_match_all("/<td class=\"num\".*?>([\d]+).*?<\/td>/", $value, $num);
	      var num_regex = /<td class="num".*?>([\d]+).*?<\/td>/g;
	      var num_result = num_regex.exec(more_result[1]);
	      // console.log(num_result[1]);

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
		// file.writeFile('msg1.txt', JSON.stringify(GameData));
		// console.log(GameData);
		callback(GameData);
	});
	
}

//跟資料庫確認是否有資料
function checksql(connection, callback){
	analypage(function(GameData){
		// file.writeFile("msg3.txt", JSON.stringify(GameData));
		var queryinsert = "INSERT INTO betgame (bet_date, bet_leaguname, bet_ht, bet_at, bet_time, bet_rq0, bet_rq1, bet_odds0, bet_odds1, bet_odds2, bet_odds3, bet_odds4, bet_odds5, bet_num) VALUES ";
		var flag = 0;
		var insertGameJSON = {};
		var updateGameJSON = {};
		var num = Object.keys(GameData).length;
		for(var i = 0; i < num; i++){
			selectstr(i, GameData,function(GameData){
				if(Gamedata[i]['status'] == "new"){
	    		Object.assign(insertGameJSON, GameData[i]);
	    	}
	    	else if(Gamedata[i]['status'] == "update"){
	    		Object.assign(updateGameJSON, GameData[i]);
	    	}
			});
			
	    // query_exec(selectquery, i , GameData, function(Gamedata){
	    // 	if(Gamedata[i]['status'] == "new"){
	    // 		Object.assign(insertGameJSON, GameData[i]);
	    // 	}
	    // 	else if(Gamedata[i]['status'] == "update"){
	    // 		Object.assign(updateGameJSON, GameData[i]);
	    // 	}
	    // });
	  

		}
		// insertdata(queryinsert);
		callback(insertGameJSON, updateGameJSON);
	});
}

function selectstr(i, GameData, callback){
	// console.log(i);
	var selectquery = "SELECT " +
                      "bet_odds0 as odds0, " +
                      "bet_odds1 as odds1, " +
                      "bet_odds2 as odds2, " +
                      "bet_odds3 as odds3, " +
                      "bet_odds4 as odds4, " +
                      "bet_odds5 as odds5, " +
                      "bet_num as num, " +
                      "bet_ID " +                                           
                    "FROM " +
                      "betgame " +
                    "WHERE " +
                      "bet_date = '" + GameData[i]['date'] + "' AND " +
                      "bet_leaguname = '" + GameData[i]['leaguname'] + "' AND " +
                      "bet_ht = '" + GameData[i]['ht'] + "' AND " +
                      "bet_at = '" + GameData[i]['at'] + "' AND " +
                      "bet_time = '" + GameData[i]['time'] + "'";
	connection.query(selectquery, function(error, result){
  	// console.log("HAHA");
  	console.log(i);
  	console.log(selectquery);
  	if(error) throw error;
  	//資料有更新就UPDATE
  	// console.log(i);
  	if(result == ""){  //先確認有無資料
  		//沒有就INSERT
  		queryinsert +=  "('" + GameData[i]['date'] + "','" + GameData[i]['leaguname'] + "','" + GameData[i]['ht'] + "','" + GameData[i]['at'] + "','" +  GameData[i]['time'] + "'," + GameData[i]['rq0'] + "," +GameData[i]['rq1'] + ",'" +GameData[i]['odds0'] + "','" + GameData[i]['odds1'] + "','" +GameData[i]['odds2'] + "','" +GameData[i]['odds3'] + "','" +GameData[i]['odds4'] + "','" +GameData[i]['odds5'] + "'," +GameData[i]['num'] + "),";
  		flsg = 1;
  		GameData[i]['status'] = 'new'; //增加狀態區分新增和更新 
  		// Object.assign(insertGameJSON, GameData[i]);
  	}
  	else {
  		//有就看是否需要更新
  		compare(result, GameData, function(data){
  			GameData = data;
  		});
		}
		callback(GameData);
	}); 
}

function compare(result, GameData, callback){
	if(result[0]['odds0'] != GameData[i]['odds0'] || result[0]['odds1'] != GameData[i]['odds1'] || result[0]['odds2'] != GameData[i]['odds2'] ||
     result[0]['odds3'] != GameData[i]['odds3'] || result[0]['odds4'] != GameData[i]['odds4'] || result[0]['odds5'] != GameData[i]['odds5'] || 
     result[0]['num'] != GameData[i]['num']){
		var queryupdate = "UPDATE " +
                    		"betgame " +
                      "SET " +
                        "bet_odds0='" + GameData[i]['odds0'] + "', "+
                        "bet_odds1='" + GameData[i]['odds1'] + "', " +
                        "bet_odds2='" + GameData[i]['odds2'] + "', " +
                        "bet_odds3='" + GameData[i]['odds3'] + "', " +
                        "bet_odds4='" + GameData[i]['odds4'] + "', " +
                        "bet_odds5='" + GameData[i]['odds5'] + "', " +
                        "bet_num=" + GameData[i]['num'] + 
                      " WHERE " +
                        "bet_ID=" + GameData[i]['bet_ID'];
    GameData[i]['status'] = 'update'; //增加狀態區分新增和更新 
		// Object.assign(updateGameJSON, GameData[i]);
		connection.query(queryupdate, function(error){
  		if(error) throw error;
  	});
  	callback(GameData);
  }
}

/*function query_exec(selectquery, i, Gamedata, callback){
	var queryinsert = "INSERT INTO betgame (bet_date, bet_leaguname, bet_ht, bet_at, bet_time, bet_rq0, bet_rq1, bet_odds0, bet_odds1, bet_odds2, bet_odds3, bet_odds4, bet_odds5, bet_num) VALUES ";
	var flag = 0;
	var insertGameJSON = {};
	var updateGameJSON = {};
	connection.query(selectquery, function(error, result){
  	// console.log("HAHA");
  	// console.log(i);
  	// console.log(selectquery);
  	// console.log(GameData);
  	if(error) throw error;
  	//資料有更新就UPDATE
  	// console.log(i);
  	if(result == ""){  //先確認有無資料
  		//沒有就INSERT
  		queryinsert +=  "('" + GameData[i]['date'] + "','" + GameData[i]['leaguname'] + "','" +
                                       GameData[i]['ht'] + "','" +
                                       GameData[i]['at'] + "','" +
                                       GameData[i]['time'] + "'," +
                                       GameData[i]['rq0'] + "," +
                                       GameData[i]['rq1'] + ",'" +
                                       GameData[i]['odds0'] + "','" +
                                       GameData[i]['odds1'] + "','" +
                                       GameData[i]['odds2'] + "','" +
                                       GameData[i]['odds3'] + "','" +
                                       GameData[i]['odds4'] + "','" +
                                       GameData[i]['odds5'] + "'," +
                                       GameData[i]['num'] + "),";
  		flsg = 1;
  		GameData[i]['status'] = 'new'; //增加狀態區分新增和更新 
  		// Object.assign(insertGameJSON, GameData[i]);
  	}
  	else {
  		//有就看是否需要更新
  		if(result[0]['odds0'] != GameData[i]['odds0'] || result[0]['odds1'] != GameData[i]['odds1'] || result[0]['odds2'] != GameData[i]['odds2'] ||
  	     result[0]['odds3'] != GameData[i]['odds3'] || result[0]['odds4'] != GameData[i]['odds4'] || result[0]['odds5'] != GameData[i]['odds5'] || 
  	     result[0]['rq0'] != GameData[i]['rq0'] || result[0]['rq1'] != GameData[i]['rq1']){
  			var queryupdate = "UPDATE " +
                        		"betgame " +
                          "SET " +
                            "bet_odds0='" + GameData[i]['odds0'] + "', "+
                            "bet_odds1='" + GameData[i]['odds1'] + "', " +
                            "bet_odds2='" + GameData[i]['odds2'] + "', " +
                            "bet_odds3='" + GameData[i]['odds3'] + "', " +
                            "bet_odds4='" + GameData[i]['odds4'] + "', " +
                            "bet_odds5='" + GameData[i]['odds5'] + "', " +
                            "bet_num=" + GameData[i]['num'] + 
                          " WHERE " +
                            "bet_ID=" + GameData[i]['bet_ID'];
        GameData[i]['status'] = 'update'; //增加狀態區分新增和更新 
  			// Object.assign(updateGameJSON, GameData[i]);
    		connection.query(queryupdate, function(error){
	    		if(error) throw error;
	    	});
  		}
		}
		callback(GameData);
  }); 
}*/


	    // connection.query(selectquery, function(error, result){
	    // 	// console.log("HAHA");
	    // 	console.log(i);
	    // 	// console.log(selectquery);
	    // 	if(error) throw error;
	    // 	//資料有更新就UPDATE
	    // 	// console.log(i);
	    // 	if(result == ""){  //先確認有無資料
	    // 		//沒有就INSERT
	    // 		queryinsert +=  "('" + GameData[i]['date'] + "','" + GameData[i]['leaguname'] + "','" +
     //                                       GameData[i]['ht'] + "','" +
     //                                       GameData[i]['at'] + "','" +
     //                                       GameData[i]['time'] + "'," +
     //                                       GameData[i]['rq0'] + "," +
     //                                       GameData[i]['rq1'] + ",'" +
     //                                       GameData[i]['odds0'] + "','" +
     //                                       GameData[i]['odds1'] + "','" +
     //                                       GameData[i]['odds2'] + "','" +
     //                                       GameData[i]['odds3'] + "','" +
     //                                       GameData[i]['odds4'] + "','" +
     //                                       GameData[i]['odds5'] + "'," +
     //                                       GameData[i]['num'] + "),";
	    // 		flsg = 1;
	    // 		GameData[i]['status'] = 'new'; //增加狀態區分新增和更新 
	    // 		Object.assign(insertGameJSON, GameData[i]);
	    // 	}
	    // 	else {
	    // 		//有就看是否需要更新
	    // 		if(result[0]['odds0'] != GameData[i]['odds0'] || result[0]['odds1'] != GameData[i]['odds1'] || result[0]['odds2'] != GameData[i]['odds2'] ||
	    // 	     result[0]['odds3'] != GameData[i]['odds3'] || result[0]['odds4'] != GameData[i]['odds4'] || result[0]['odds5'] != GameData[i]['odds5'] || 
	    // 	     result[0]['rq0'] != GameData[i]['rq0'] || result[0]['rq1'] != GameData[i]['rq1']){
	    // 			var queryupdate = "UPDATE " +
     //                        		"betgame " +
		   //                        "SET " +
		   //                          "bet_odds0='" + GameData[i]['odds0'] + "', "+
		   //                          "bet_odds1='" + GameData[i]['odds1'] + "', " +
		   //                          "bet_odds2='" + GameData[i]['odds2'] + "', " +
		   //                          "bet_odds3='" + GameData[i]['odds3'] + "', " +
		   //                          "bet_odds4='" + GameData[i]['odds4'] + "', " +
		   //                          "bet_odds5='" + GameData[i]['odds5'] + "', " +
		   //                          "bet_num=" + GameData[i]['num'] + 
		   //                        " WHERE " +
		   //                          "bet_ID=" + GameData[i]['bet_ID'];
		   //      GameData[i]['status'] = 'update'; //增加狀態區分新增和更新 
	    // 			Object.assign(updateGameJSON, GameData[i]);
		   //  		connection.query(queryupdate, function(error){
			  //   		if(error) throw error;
			  //   	});
	    // 		}
	  		// }
	    // }); 