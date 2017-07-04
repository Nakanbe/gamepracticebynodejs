// var Gamedata = {};
// socket.on('result', function(data){  //收到回傳的資料
//   $('#loading').hide();
//   if(data == 'no_search_condition'){
//     alert('請輸入搜尋條件');
//   }
//   else if(data == 'no_insert_or_update'){
//     alert('沒有需要新增或更新的資料');
//     output('');
//   }
//   else if(data == 'no_search_result'){
//     alert('沒有符合的資料');
//     output('');
//   }
//   else{
//     Gamedata = data;
//   }
//   console.log(Gamedata);
//   //data[0]['status']
//   //data[0]['leaguname']
//   //data[0]['date']
//   //data[0]['ht']
//   //data[0]['at']
//   //data[0]['time']
//   //data[0]['rq0']
//   //data[0]['rq1']
//   //data[0]['odds0']
//   //data[0]['odds1']
//   //data[0]['odds2']
//   //data[0]['odds3']
//   //data[0]['odds4']
//   //data[0]['odds5']
//   //data[0]['num']
// });

// Vue.component('game-status', {
//   template: '<tr class="more expanded" id="more{{ change }}"'+
//             ' style="border-top: 0;" v-on:click="r({{ change }});">'+
//             '<td colspan="6"><span class="moreIcon"></span>{{ str }} </td></tr>'
// })

Vue.component('game-status', {
  template: '<h1>hello</h1>'
})

var showGame = new Vue({
  el: "#gametable2",
  data: {}
})