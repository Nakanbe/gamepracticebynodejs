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
myObj = {
    'name': 'Umut',
    'age' : 34
};

prop = 'HAHA';
value = 'Onur';

myObj[prop] = {};
myObj[prop][5] = value;

console.log(myObj);  //{ name: 'Umut', age: 34, HAHA: { '5': 'Onur' } }