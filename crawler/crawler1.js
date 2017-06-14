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
		pagestr('table .odds span').each(function(i, el){
			odds.push(pagestr(this).text().trim().substring(0, 10));
			console.log(pagestr(this).text().trim().substring(0, 10))
		});
		// console.log(pagestr('.gameTable').html());
		// odds.push();
		// console.log(pagestr('span .rq1 >  .rq2').text());
		// console.log(pagestr('.gameTable').find('.num').text());

		// console.log(pagestr('table .more.expanded').length);
		pagestr('table .more.expanded').each(function (i){
			date.push(pagestr(this).text().trim());
		});
		for(var i = 1; i <= date.length; i++){
			// pagestr('table .moreContent.more' + i).html();
			// console.log(pagestr('table .moreContent.more' + i).html());
			// var pagestr2 = cheerio.load(pagestr('table .moreContent.more' + i).html());
			var moreContent = pagestr('table .moreContent.more' + i);  //把moreContent裡的資料抓出來
			moreContent.each(function(idx){
				// console.log(pagestr(this).html());
				var moreContent_html = cheerio.load(pagestr(this).html());
				// Gamedata['0'][idx]['ht'] = moreContent_html('.ht').text();
				// console.log(idx);
			});

		}

	}

});

//console.log(Gamedata['2017-06-15 每次竞猜选择一个选项下注'][1]['ht']);
console.log(odds);