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
		date_matches.push(date_result[1]);
	}
	// file.writeFile("msg1.txt", date_matches);

	for(var i = 0; i < date_matches.length; i++){
		//preg_match_all("/<tr class=\"moreContent more" . "$i" . ".*?row\">(.*?)<\/tr>/", $head[1][0], $tr);
		// var more_regex = "/<tr class=\"moreContent more" + i + ".*?row\">(.*?)<\/tr>/g";
		// var more_regex = more_str;
		var more_regex = new RegExp("<tr class=\"moreContent more" + (i+1) + ".*?row\">(.*?)<\/tr>", "g");
		var more_result = "";
		// var more_result = more_regex.exec(gameTable_res[1]);
		// console.log(more_result);
		while(more_result = more_regex.exec(gameTable_res[1])){
			
			// preg_match_all("/<span class=\"leagueName\".*?>(.*?)\s?<\/span>/", $value, $leagueName);
			var leaguname_regex = /<span class="leagueName".*?>(.*?)\s?<\/span>/g;
			var leaguname_result = leaguname_regex.exec(more_result[1]);
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
			while(odds_result = odds_regex.exec(more_result[1])){  //有無限迴圈出現，注意有g和沒g的差別，沒g只會抓第一個符合的，有g全部都會抓
				// console.log(odds_result[0]);
				odds_matches.push(odds_result[1]);
				// console.log(odds_result[1]);
			// }
      // preg_match_all("/<span class=\"rq.*?>\+?([^\+].*?)\s?<\/span>/", $value, $rq);
      var rq_regex = /<span class="rq.*?>\+?([^\+].*?)\s?<\/span>/g; //多筆資料要迴圈
			var rq_matches = [];
			var rq_result = "";
      while(rq_result = rq_regex.exec(more_result[1])){
				rq_matches.push(rq_result[1]);
				console.log(rq_result[1]);
			}
      // preg_match_all("/<td class=\"num\".*?>([\d]+).*?<\/td>/", $value, $num);
      var num_regex = /<td class="num".*?>([\d]+).*?<\/td>/g;
      var num_result = num_regex.exec(more_result[1]);
      console.log(num_result[1]);
		}
	}

});