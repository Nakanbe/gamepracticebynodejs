var request = require('request');
var cheerio = require('cheerio');
// var URL = require('url-parse');


var page = "http://www.kufa88.com/Promotion/jingcai";
console.log ('visiting page' + page);
const date = [];
const odds = [];
const Gamedata = {};
request(page, function(error, response, body){
	if(error){
		console.log("Error: " + error);
	}
	if(response.statusCode === 200){
		// console.log(body);
		var pagestr = cheerio.load(body);
		// console.log(pagestr);
		console.log("Page title:  " + pagestr('title').text());
		// for(var i = 0; i < pagestr('table .more.expanded').get().length; i++)
		// console.log(i + pagestr('table .more.expanded').eq(i).text());
		// console.log(pagestr('table .odds span').eq(0).text());
		// pagestr('table .odds span').each(function(i, el){
		// 	odds.push(pagestr(this).text().trim().substring(0, 10));
		// 	console.log(pagestr(this).text().trim().substring(0, 10));
		// });
		// console.log(pagestr('.gameTable').html());
		// odds.push();
		// console.log(pagestr('span .rq1 >  .rq2').text());
		// console.log(pagestr('.gameTable').find('.num').text());

		// console.log(pagestr('table .more.expanded').length);
		// console.log(pagestr('table .time').text());

		pagestr('table .more.expanded').each(function (i){
			date.push(pagestr(this).text().trim().substring(0, 10));
			// console.log(pagestr(this).text().trim().substring(0, 10));
		});
		for(var i = 1; i <= date.length; i++){
			Gamedata[date[i-1]] = {};
			// pagestr('table .moreContent.more' + i).html();
			// console.log(pagestr('table .moreContent.more' + i).html());
			// var pagestr2 = cheerio.load(pagestr('table .moreContent.more' + i).html());
			var moreContent = pagestr('table .moreContent.more' + i);  //把moreContent裡的資料抓出來
			moreContent.each(function(idx){  //會抓moreContent第一筆資料，第二筆資料...
				Gamedata[date[i-1]][idx] = {};
				// console.log(pagestr(this).html());
				var moreContent_html = cheerio.load(pagestr(this).html());
				// Gamedata[date[i-1]][idx]["leaguname"] = moreContent_html('.leagueName').text();
				// Gamedata[date[i-1]][idx]["at"] = moreContent_html('.at').text();
				// Gamedata[date[i-1]][idx]["ht"] = moreContent_html('.ht').text();
				// Gamedata[date[i-1]][idx]["time"] = moreContent_html('time').text();
				// console.log(moreContent_html('tr .time').html());
				// Gamedata[date[i-1]][idx]["rq1"] = moreContent_html('.rq1').text();
				// Gamedata[date[i-1]][idx]["rq2"] = moreContent_html('.rq2').text();
				// Gamedata[date[i-1]][idx]["odds"] = moreContent_html('.odds span').text();
				// moreContent_html('.odds span').each(function(idx2){
				// 	Gamedata[date[i-1]][idx]["odds" + idx2] = moreContent_html(this).text(); 
				// });
				// Gamedata['0'][idx]['ht'] = moreContent_html('.ht').text();
				// console.log(idx);
				Gamedata[date[i-1]][idx]["num"] = moreContent_html('td').find('.num').text();
				
				// console.log(Gamedata[date[i]][idx]['ht']);
				console.log(Gamedata);
			});
		}

	}

});

//console.log(Gamedata['2017-06-15 每次竞猜选择一个选项下注'][1]['ht']);
//console.log(odds);

function assign(i, idx, str, callback){
	Gamedata[date[i]][idx]["ht"] = str;
	// console.log(Gamedata[date[i]][idx]['ht']);
	console.log(Gamedata);
	callback();

}

function output(){
	for(var i = 0;i < date.length; i++){
		for(var j =0; j< Object.keys(Gamedata[date[i]]).length; j++){
			console.log(Gamedata[date[i]][j]['ht']);
		}
	}
}
