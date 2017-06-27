var app = new Vue({
  el: '#app',
  data: {
    fruit: [
      {text:'banana', done:true},
      {text:'apple', done:false}],
    newInput : ''
  },
  computed: {
    remaining() {  //計算 false 數量
      var count = 0;
      for(var key in this.fruit) {
        if(this.fruit[key].done == false)
          count++;
      }
      return count;
    }
  },
  methods: {
    addFruit() {  //新增
      this.fruit.push({ text:this.newInput, done:false });
      this.newInput = "";
    },
    removeFruit() {  //刪除
      var newFruit = [];
      for(var key in this.fruit) {
        if(this.fruit[key].done == false)
          newFruit.push({ text:this.fruit[key].text , done:false });
      }
      this.fruit = newFruit;
    }
  }
  
  
})
