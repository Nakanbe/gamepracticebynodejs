// const obj = 
// { 
// 	'2017-06-04': 
// 	{
// 		1:
// 		{
// 			id: 5,
//   		name: 'San Francisco'
// 		}
// 	}
// };

// obj['2017-06-03'][0]['ht'] = 'HAHA';

// console.log(obj);
// myObj = {
//     'name': 'Umut',
//     'age' : 34
// };

// prop = 'HAHA';
// value = 'Onur';

// myObj[prop] = {};
// myObj[prop][5] = value;

// console.log(myObj);  //{ name: 'Umut', age: 34, HAHA: { '5': 'Onur' } }

// var a = "null";
// var b = 'null';
// var c = 0;
// var d = "NULL";
// var e = 'NULL';
// var f = null;
// var g = NULL;

// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);
// console.log(e);
// console.log(f);
// console.log(g);

// if(a==b){
// 	console.log("a==b");
// }
// if(a==c){
// 	console.log("a==c");
// }
// if(a==d){
// 	console.log("a==d");
// }
// if(a==e){
// 	console.log("a==e");
// }
// if(null==0){
// 	console.log("c==f");
// }

var file = require('fs');
var re = /(brown)/ig;
var str = 'The Quick Brown Fox Jumps Over The Lazy Dog brown brOwn';
// var result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog brown1 brown2');
// var result = re[Symbol.match](str);


for (var matches = []; result = re.exec(str); matches.push(result));
// file.writeFile("msg3.txt", matches);
for(var i = 0; i < matches.length; i++){
	// console.log(matches[i][1]);
}


// var str="1 plus 2 equal 3";
// console.log(str.match(/\d+/g));

// var re = /[0-9]+/g;
// var str = '2016-01-02';
// var result = re[Symbol.match](str);
// console.log(result);  // ["2016", "01", "02"]