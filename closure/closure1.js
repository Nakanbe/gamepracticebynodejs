/*var count = 0;
function CountDog(){
  count++;
  console.log(count + 'dogs');
};

var count = 0;
function CountCat(){
  count++;
  console.log(count + 'cats');
};

CountDog();
CountDog();
CountCat();
CountCat();
CountDog();
CountCat();*/

function CountDog(){
  var count = 0;
  return function(){
    count++;
    console.log(count + 'dogs');
  };
};

function CountCat(){
  var count = 0;
  return function(){
    count++;
    console.log(count + 'cats');
  };
};

var dog = CountDog();
var cat = CountCat();

dog();
cat();
dog();
dog();
cat();
cat();