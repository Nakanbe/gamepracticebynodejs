var a1 = new Array('x1', 6, 7);
console.log('a1=' + a1.length);

var a2 = new Array('x1',7 );
console.log('a2=' + a2.length);

var a3 = new Array('x1');
console.log('a3=' + a3.length);

var a4 = new Array(5);
console.log('a4=' + a4.length);

(function(){
  console.log('HAHAHAH');
})();
//console.log(++[[]][+[]]+[+[]]);

var result = [];
for (var i=0; i < 5; i++) {
    result.push(function () { return i });  // (*)
}
console.dir(result); // 5 (not 3)

function add(x){
  
  return function(y){
    return x + y;
  };
}

var add5 = add(5);
console.log(add5);
var no8 = add5(3);
console.log(no8) //回傳8

var name2 = "Microsoft";

function funcC(){
    var name2 = "Google";
    console.log(name2);
    return function(){
        name2 = "Facebook";
        console.log(name2);
    };
}

var o = funcC();
funcC();
console.log('---');
console.log(name2);
o();

var name = "阿帕契";
function funcA(){
  var name = "澇哥哥一團";
  console.log(name);
  return function(){
    name = name + " 再多一團";
    console.log(name);
  };
}
var Apache = funcA(); //"澇哥哥一團"
console.log(name); //"阿帕契"
Apache(); // "澇哥哥一團 再多一團"
console.log(name); //"阿帕契"
Apache(); // "澇哥哥一團 再多一團 再多一團"
Apache(); // "澇哥哥一團 再多一團 再多一團 再多一團"

var str1;// = 'str11';
var str2 = 'str22';
//var strr = (str1 ? str1 : '' ) + (str2 ? str2 : '');
//console.log(strr);
if(str1){
  console.log('123');
}
else{
  console.log(223)
}


function funcD(that) {
  console.log(that === this);
  console.log(myVar);
}

function funcE(that) {
  var myVar = 2;
  console.log(that === this);
  funcD(this);
}

var myVar = 1;
funcE(this);
console.log('----------buildFunctions-----------');
function buildFunctions() {
  var arr = [];

  for(var i = 0; i < 3; i++){
    arr.push(function (j) {
      return function () {
        console.log(j);
      };
    }(i));
  }

  return arr;
};

var fs = buildFunctions();
console.log(fs);
console.log('fs0'+fs[0]());
fs[1]();
fs[2]();
console.log('---------------------');
function buildFunctions2(){

 i = 3;

 function number(){
  console.log(i);
 }
 
 return number;
}

var output = buildFunctions2();
console.log(output);
output();

console.log('---------------------');
console.log('----------funcF-----------');

function funcF(str) {
  var x = str;
  setTimeout(function() {
    console.log('inside'+x);
  },5000);
  console.log('outside' + x);
}; 

funcF('del');
funcF('get');

console.log('----------funcG-----------');

function funcG() {
  var count = 0;
  count++;
}

function funcH() {
  var count = 0;
  return function () {
    count++;
    console.log('H:' + count);
  };
}

var H = funcH();
H();

console.log('----------funcI-----------');

function funcI(){
  var count = 0;
  return function (Itime) { 
    count++;
    return function (count2, Itime2){
      setTimeout(function() {
        console.log(Itime2 + ' I ' + count2);
     },Itime*1000);
    }(count, Itime);
  };
};

var I = funcI();
I(0.1);
I(5);
I(1);
