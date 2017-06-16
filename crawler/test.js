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

// var file = require('fs');
// var re = /(brown)/ig;
// var str = 'The Quick Brown Fox Jumps Over The Lazy Dog brown brOwn';
// // var result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog brown1 brown2');
// // var result = re[Symbol.match](str);


// for (var matches = []; result = re.exec(str); matches.push(result));
// // file.writeFile("msg3.txt", matches);
// for(var i = 0; i < matches.length; i++){
// 	// console.log(matches[i][1]);
// }

// var arr = [1, 2, 3];
// var arr2 = arr.fill(4, 3, 5);
// console.log(arr2[3]);


// var str="1 plus 2 equal 3";
// console.log(str.match(/\d+/g));

// var re = /[0-9]+/g;
// var str = '2016-01-02';
// var result = re[Symbol.match](str);
// console.log(result);  // ["2016", "01", "02"]

//----------------------------------------------------------
// function add(a,b){
// 	var c = 0;
// 	for(var i = 0; i < 5; i++){
// 		setTimeout(function(){
// 			c = i;
// 		},1000);
// 		console.log(c)
// 	}
// 	// console.log(c);
// }
// add(1,2);

// function sub(a,b){
// 	for(var i = 0; i < 10000000; i++);
// 	for(var i = 0; i < 10000000; i++);
// 	for(var i = 0; i < 10000000; i++);
// 	var c = a-b;
// }

// function result(a,b, callback){
// 	var e = 0, f = 0;
// 	var e = add(a,b);
// 	var f = sub(a,b);
// 	callback(f);
// 	// add(a,b,function(c){
// 	// 	e = c + '1';
// 	// });
// 	// sub(a,b,function(d){
// 	// 	f = d + '1';
// 	// });
// }

// result(5,2,function(data){
// 	console.log(data);
// });
//-----------------------------------------------------
// var obj1 = {1:{ht: 'a1', at: 'a2'}, 2:{ht: 'b1', at :'b2'}};
// var obj2 = {1:{ht: 'c1', at: 'c2'}};
// var obj3 = {3:{ht: 'd1', at: 'd2'}};
// var obj6 = {};
// const obj4 = Object.assign(obj3, obj1, obj2, obj1);
// obj6 = obj1;
// var num = (Object.keys(obj1).length + Object.keys(obj2).length);
// // console.log(typeof (Object.keys(obj1).length + Object.keys(obj2).length));
// for(var i = 0; i < num; i++){
// 	var idx = 1;
// 	if(!(obj6.hasOwnProperty(i))){
// 		obj6[i] = obj2[idx];
// 		console.log(",,")
// 		idx++;
// 	}
// }
// 。var {1, 2} = { obj1, obj2};
// console.log(JSON.stringify(obj1));
// console.log(JSON.stringify(obj2));
// console.log(JSON.stringify(obj3));
// console.log(JSON.stringify(obj6));
//{"C":{"C1":"c1","C2":"c2"}}
//--------------------------------------------------------

function add(a,b, callback){
	for(var i = 0; i < 10; i++){
		c = a+b;
		callback(i);
	}
}

add(1,2,function(i){
	console.log(i);
});