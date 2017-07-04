Vue.component('my-com', {
	template: '<p>Hello {{wines}} + {{key}}</p>'
})

//child
// var counter;
Vue.component('simple-counter', {
  props: ['message2'],
	// template: '<button v-on:click = "counter += 1">{{counter}}</button>',
  template: '<span>{{message2}}</span>',
	 // data: function(){
		 // return {counter : 0}
	 // }
})

//root
var app8 = new Vue({
	el: '#example8',
	data:{
		Names: [],
		Wine: [{a: 'beer'}, {b: 'whisky'}, {c: 'vodka'}],
		ok: false,
    counter: 0
	},
  methods: {
    plus(){
      this.counter++;
    }
  }
})

var app6 = new Vue({
  el: '#example6'
})

var data = {message: 'Hello Vue.js'};

Vue.component('my-com2', {
	template: '<p>{{ message }}</p>',
	data: function() {
		return data
	}
})

var app7 = new Vue({
	el: '#example7'
})

var app9 = new Vue({
  el: "#example9",
  data: {
    time: (new Date()).toLocaleTimeString()
  }
})

var Timer = setInterval(function(){
  var d = new Date();
  app9.time = d.toLocaleTimeString()
},1000);

var app10 = new Vue({
  el: "#example10",
  data: {
    url: "https://www.google.com.tw",
    show: true
  }
})
setInterval(function(){
  app10.show = !app10.show
},1000);

var app11 = new Vue({
  el: "#example11",
  data:{
    seen: true,
    timecounter: 5,
    message: "This message will be disappear after 5 second and show again after 5 secs" 
  }
})

setInterval(function(){
  app11.timecounter--;
},1000);

setInterval(function(){
  app11.seen = !app11.seen;
},5000);

var app12 = new Vue({
  el: "#example12",
  data: {
    shape: ['circle', 'triangle', 'ball', 'bar'],
    phone: {HTC: 'U11', SAMSUNG: "S8", LG: "G6", APPLE: "iPhone7"},
    WTFphone: [{HTC: "UU"}, {Samsuan: "S8+"}, {LG: "V20"}, {APPLE: "iPhone8"}]
  }
})

var app13 = new Vue({
  el: "#example13",
  data:{
    message: "what the fuck"
  },
  filters:{
    upperletter: text=>text.toUpperCase(),
    abbreviation: (text)=>{
      var chars = "";
      text.split(" ").forEach( ch=>{
        chars += ch.charAt(0) + ".";
      })
      return chars;
    }
  }
})

var app14 = new Vue({
  el: "#example14",
  data: {
    count: 0,
    info: "",
    show: false,
    word: ""
  },
  methods: {
    increase: function(event) {  //因為this緣故不能使用arrow function
      this.count++;
      if(this.count == 10){
        this.info = "You have already click 10 times.";
        this.show = true;
      }
      else if(this.count < 20 && this.count > 10){
        this.show = false;
      }
      else if(this.count >= 20){
        this.info = "You have already clicks 20 times.";
        this.show = true;
        alert(event.target.tagName);
        alert(event.type);
        alert(event);
      }
    },
    disword: function(){
      this.word="A";
    },
    delword: function(){
      this.word = "";
    }
  }
})

var app15 = new Vue({
  el: "#example15",
  data: {
    txt: "",
    txt2: "",
    txt3: "",
    txt4: ""
  }
})

var app16 = new Vue({
  el: "#example16",
  data: {
    characters: []
  }
})

var app17 = new Vue({
  el: "#example17",
  data: {
    character: "",
    characters: [
      {text: 'Miss Fortune', value: 'MF'},
      {text: 'Akali', value: 'Ak'},
      {text: 'Caitlyn', value: 'CA'}
    ]
  }
})

var app18 = new Vue({
  el: "#example18",
  data: {
    isshowBG: true
  }
})

setInterval(function(){
  app18.isshowBG = !app18.isshowBG
}, 5000)

var app19 = new Vue({
  el: '#example19',
  data: {
    a: 1
  },
  beforeCreate: function(){
    console.log('== beforeCreate ==')
    console.log('this.a: ' + this.a)
    console.log('this.$el: ' + this.$el)
    console.log()
  },
  created: function(){
    console.log('== created ==')
    console.log('this.a: ' + this.a)
    console.log('this.$el: ' + this.$el)
    console.log()
  },
  mounted: function(){
    console.log('== mounted ==')
    console.log('this.a: ' + this.a)
    console.log('this.$el: ' + this.$el)
  }
})

Vue.component('e20-com',{
  props: ['cmsg'],
  template: '<pre>child:  {{cmsg}}</pre>'
})

var app20 = new Vue({
  el: "#example20",
  data: {
    pmsg: ""
  }
})

Vue.component('e21-com',{
  props: ['cmsg'],
  template: `<div>
              <pre>Child:  {{cmsg}}</pre>
              <input :value="cmsg" @input="cmsg = $event.target.value"></input>
             </div>`,

})

var app21 = new Vue({
  el: "#example21",
  data: {
    pmsg: ""
  }
})

var app22 = new Vue({
  el: "#example22",
  data: {
    msg: ""
  }
})

Vue.component('e23-com',{
  props: ['cmsg'],
  template: '<div><pre>Child:  {{cmsg}}</pre><input :value="cmsg" @input="showvalue($event.target.value)"></input></div>',
  methods:{
    showvalue: function(value){
      this.$emit('getvalue', value)
    }
  }
})

var app23 = new Vue({
  el: "#example23",
  data: {
    msg: ""
  },
  methods: {
    displayvalue: function(s){  //所以放在methods裡
      // console.log(s)
      this.msg = s;
    }
  }
})

//child component 無法直接改變 parent component 的 data 
//所以經由 e23-com 裡的 showvalue emit 資料給 getvalue
//getvalue 監聽到後觸發 app23 裡的 displayvalue
//displayvalue 再去渲染 msg 

var app24 = new Vue({  //v-model的另一種寫法
  el: "#example24",
  data: {
    msg: ""
  }
})

Vue.component('e25-com',{
  template: '\
            <div>\
              <slot name="section1"></slot>\
              <slot name="section2"></slot>\
              <slot></slot>\
            </div>\
            '
})

var app25 = new Vue({
  el: "#example25",
})

Vue.component('upstair',{
  template: '<p>在二樓</p>'
})

Vue.component('downstair',{
  template: '<p>在一樓</p>'
})

Vue.component('goout',{
  template: '<p>出門RRR</p>'
})

var app26 = new Vue({
  el: "#example26",
  data: {
    currentfloor: 'upstair'
  },
  methods: {
    gotofloor: function(where){
      this.currentfloor = where;
    }
  }
}) 

Vue.component('e27-com',{
  template: '\
            <table>\
              <thead>\
                <tr>\
                  <th>Project</th>\
                  <th>Description</th>\
                  <th class="center" colspan="2"><a><i class="material-icons blue">add_circle_outline</i></a></th>\
                </tr>\
              </thead>\
              <tbody>\
                <tr v-for="(p, i) in pro">\
                  <td><a v-bind:href="p.site">{{p.name}}</a></td>\
                  <td>{{p.description}}</td>\
                  <td><a><i class="material-icons blue">clear</i></a></td>\
                  <td><a><i class="material-icons blue">create</i></a></td>\
                </tr>\
              </tbody>\
            </table>\
            ',
  props: ['pro']
})

var app27 = new Vue({
  el: '#example27',
  data: {
    projects: [  //資料
      {
        name: 'AngularJS',
        site: 'http://angularjs.org',
        description: 'HTML enhanced for web apps!'
      },
      {
        name: 'Angular',
        site: 'http://angular.io',
        description: 'One framework. Mobile and desktop.'
      },
      {
        name: 'jQuery',
        site: 'http://jquery.com/',
        description: 'Write less, do more.'
      },
      {
        name: 'Backbone',
        site: 'http://backbonejs.org/',
        description: 'Models for your apps.'
      },
      {
        name: 'SproutCore',
        site: 'http://sproutcore.com/',
        description: 'A Framework for Innovative web-apps.'
      }
    ],
  }
})


Vue.component('showlist',{
  template: '\
            <table>\
              <thead>\
                <tr>\
                  <th>Project</th>\
                  <th>Description</th>\
                  <th class="center" colspan="2"><a  @click="emitshow(\'showadd\',-1)"><i class="material-icons blue">add_circle_outline</i></a></th>\
                </tr>\
              </thead>\
              <tbody>\
                <tr v-for="(p, i) in pro">\
                  <td><a v-bind:href="p.site">{{p.name}}</a></td>\
                  <td>{{p.description}}</td>\
                  <td><a @click="emitshow(\'del\',i)"><i class="material-icons blue">clear</i></a></td>\
                  <td><a @click="emitshow(\'edit\',i)"><i class="material-icons blue">create</i></a></td>\
                </tr>\
              </tbody>\
            </table>\
            ',
  props: ['pro','isadd','idx'],
  methods: {
    emitshow: function(show,i){
      this.$emit('get_show', {show: show, i: i});  //不要用駝峰式命名
    }
  }
})

Vue.component('showadd',{
  template: '\
            <table>\
              <tr>\
                <td>Name</td>\
                <td><input type="text" id="new_name" :value="isadd ? \' \':pro[idx].name "></td>\
              </tr>\
              <tr>\
                <td>Website</td>\
                <td><input type="text" id="new_website" :value="isadd ? \' \':pro[idx].site "></td>\
              </tr>\
              <tr>\
                <td>Description</td>\
                <td><input type="text" id="new_des" :value="isadd ? \' \':pro[idx].description "></td>\
              </tr>\
              <tr>\
                <td colspan="2" class="center">\
                  <button type="button" @click="emitshow(\'showlist\', -1)">Cancel</button>\
                  <button type="button" @click="emitshow(\'add\', -1)" v-show="isadd">Add</button>\
                  <button type="button" @click="emitshow(\'save\', idx)" v-show="!isadd">Save</button>\
                </td>\
              </tr>\
            </table>\
            ',
  props: ['pro','isadd','idx'],
  methods: {
    emitshow: function(show, i){
      this.$emit('get_show', {show: show, i: i});  //不要用駝峰式命名
    }
  }
})

//這樣寫的話
//<button type="button" @click="goShow(\'showlist\')">
//一樣會遇到goShow無法和app裡的goShow連接
//component裡的goShow會先被render出來
//app裡的goShow才被創造

var app28 = new Vue({
  el: '#example28',
  data: {
    projects: [  //資料
      {
        name: 'AngularJS',
        site: 'http://angularjs.org',
        description: 'HTML enhanced for web apps!'
      },
      {
        name: 'Angular',
        site: 'http://angular.io',
        description: 'One framework. Mobile and desktop.'
      },
      {
        name: 'jQuery',
        site: 'http://jquery.com/',
        description: 'Write less, do more.'
      },
      {
        name: 'Backbone',
        site: 'http://backbonejs.org/',
        description: 'Models for your apps.'
      },
      {
        name: 'SproutCore',
        site: 'http://sproutcore.com/',
        description: 'A Framework for Innovative web-apps.'
      }
    ],
    currentTable: 'showlist',
    is_add: true,
    idx: -1,
    searchWord: ''
  },
  computed: {
    filterKeyword: function() {  //關鍵字搜尋
      let s = this.searchWord.toLowerCase();  //都轉小寫
      return this.projects.filter(it => {
        return it.name.toLowerCase().indexOf(s) >= 0;
      })
    }
  },
  methods: {
    goShow: function(todo){
      switch(todo.show) {
        case 'showlist':
          this.currentTable = todo.show;
          break;
        case 'showadd':
          this.is_add = true;
          this.currentTable = todo.show;
          break;
        case 'add':
          this.projects.push({
            name: document.getElementById('new_name').value,
            site: document.getElementById('new_website').value,
            description: document.getElementById('new_des').value
          });
          this.currentTable = "showlist";
          break;
        case 'edit':
          this.currentTable = 'showadd';
          this.is_add = false;
          this.idx = todo.i;
          break;
        case 'save':
          this.projects[todo.i].name = document.getElementById('new_name').value;
          this.projects[todo.i].site = document.getElementById('new_website').value;
          this.projects[todo.i].description = document.getElementById('new_des').value;
          this.currentTable = "showlist";
          break;
        case 'del':
          this.projects.splice(todo.i, 1);
          this.currentTable = "showlist";
          break;
      }
    }
  }
})

var app29 = new Vue({
  el: '#example29',
  data: {
    num: 0,
    msg: ""
  },
  computed: {
    calc: function(){
      return this.num*5;
    },
    reversenum: function(){
      return this.msg.split('').reverse().join('');
    }
  }
  
})