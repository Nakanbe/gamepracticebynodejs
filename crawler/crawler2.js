var request = require('request');
var file = require('fs');

var page = "http://www.kufa88.com/Promotion/jingcai";
console.log ('visiting page' + page);

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
		date_matches.push(date_result);
	}
	// file.writeFile("msg1.txt", date_result);

	for(var i = 0; i < date_matches.length; i++){
		//preg_match_all("/<tr class=\"moreContent more" . "$i" . ".*?row\">(.*?)<\/tr>/", $head[1][0], $tr);
		var more_regex = "/<tr class=\"moreContent more" + i + ".*?row\">(.*?)<\/tr>/g";
		// var more_regex = more_str;
		console.log(more_regex);
		var more_result = "";
		var more_result = more_regex.exec(gameTable_res);
		/*while(more_result = more_regex.exec(gameTable_res[1])){
			// preg_match_all("/<span class=\"leagueName\".*?>(.*?)\s?<\/span>/", $value, $leagueName);
			var leaguname_regex = /<span class="leagueName".*?>(.*?)\s?<\/span>/;
			var leaguname_result = leaguname_regex.exec(more_result);
			console.log(leaguname_result);
			// preg_match_all("/<span class=\"ht\">(.*?)\s?<\/span>/", $value, $ht);
			var ht_regex = /<span class="ht">(.*?)\s?<\/span>/;
			var ht_result = ht_regex.exec(more_result);
			console.log(ht_result);
			// preg_match_all("/<span class=\"at\">(.*?)\s?<\/span>/", $value, $at);
			var at_regex = /<span class="at">(.*?)\s?<\/span>/;
			var at_result = at_regex.exec(more_result);
			console.log(at_result);
			// preg_match_all("/<td class=\"time\">(.*?)\s?<\/td>/", $value, $time);
			var time_regex = /<td class="time">(.*?)\s?<\/td>/;
			var time_result = time_regex.exec(more_result);
			console.log(time_result);
			// preg_match_all("/<span>(.*?)\s+?<input.*?>/", $value, $odds);
			var odds_regex = /<span>(.*?)\s+?<input.*?>/; //多筆資料要迴圈
			var odds_matches = [];
			var odds_result = "";
			while(odds_result = odds_regex.exec(more_result)){
				odds_matches.push(odds_result);
				console.log(odds_result);
			}
      // preg_match_all("/<span class=\"rq.*?>\+?([^\+].*?)\s?<\/span>/", $value, $rq);
      var rq_regex = /<span class="rq.*?>\+?([^\+].*?)\s?<\/span>/; //多筆資料要迴圈
			var rq_matches = [];
			var rq_result = "";
      while(rq_result = rq_regex.exec(more_result)){
				rq_matches.push(rq_result);
				console.log(rq_result);
			}
      // preg_match_all("/<td class=\"num\".*?>([\d]+).*?<\/td>/", $value, $num);
      var num_regex = /<td class="num".*?>([\d]+).*?<\/td>/;
      var num_result = num_regex.exec(num_result);
      console.log(num_result);
		}*/
	}

});