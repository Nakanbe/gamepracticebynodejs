Vue.config.debug = true;
Vue.config.devtools = true;

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
    showList: true,
    showAdd: false,
    showEdit: false,
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
    goShow(s) {  //切換畫面
      this.showList = this.showAdd = this.showEdit = false;
      switch(s) {
        case 'list':  //返回列表
          this.showList = true;
          break;
        case 'new':  //新增
          this.newPj.name = '';
          this.newPj.site = '';
          this.newPj.description = '';
          this.showAdd = true;
          break;
        case 'edit':  //修改
          this.showEdit = true;
          break;
      }
    },
    addProject() {  //執行新增資料
      this.projects.push({
        name: this.newPj.name,
        site: this.newPj.site,
        description: this.newPj.description
      });
      this.goShow('list');
    },
    editProject(p,i) {  //切換修改畫面
      this.editPj.idx = i;  //第幾筆
      this.editPj.name = p.name;
      this.editPj.site = p.site;
      this.editPj.description =  p.description;
      this.goShow('edit');
    },
    saveProject() {  //儲存修改
      this.projects[this.editPj.idx].name = this.editPj.name;
      this.projects[this.editPj.idx].site = this.editPj.site;
      this.projects[this.editPj.idx].description = this.editPj.description;
      this.editPj = {};
      this.goShow('list');
    },
    delProject(p) {  //刪除資料
      this.projects = this.projects.filter(it => it !== p);
      //false就會被filter掉
      /*
      function(it) {return it !== p;}
      */
      /*
      let rows = [];
      this.projects.forEach(it => {
        if (it !== p) {
          rows.push(it);
        }
      });
      this.projects = rows;
      */
      
    }
  }
})
