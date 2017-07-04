Vue.component('p',{
  template: <>
})

var app = new Vue({
  el: '#app',
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
      }],
    newPj:  //新增資料
      {
        name: '',
        site: '',
        description: ''
      },
    editPj:  //修改資料
      {
        idx: -1,
        name: '',
        site: '',
        description: ''
      },
    showWhich: 'p'
  },
  methods: {
    showWhich: function(site){
      this.showWhich = site;
    }
  }
})