Vue.component('my-com', {
	template: '<p>Hello</p>'
})



var app6 = new Vue({
  el: '#example'
})

var data = {message: 'Hello Vue.js'};

Vue.component('my-com2', {
	template: '<p>{{ message }}</p>',
	data: function() {
		return data
	}
})

var app7 = new Vue({
	el: '#example2'
})

var app8 = new Vue({
	el: '#example3',
	data:{
		Names: [],
		ok: true
	}
})