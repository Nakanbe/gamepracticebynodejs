var data = [];

function doData(n,callback) {
  var sql = '.....';
  .query(,function() {
  	//ins
  	if() {
      ....
      if(n+1 < data.length)
      	doData(n+1);
      else
      	callback();

  	} else {  //update
      .....
      .query(,function() {
	      if(n+1 < data.length)
	      	doData(n+1);
	      else
	      	callback();
      })
  	}
  })
}

if() {
	doData(0,function(){
    
	})
}



a(function(){
	a(function(){
		a(function(){
			a(function(){
				a(function(){

				});
			});
		});
	});
});

function a(callback){
	callback();
}