/**
 * Created by zrk on 2016/11/2.
 */

var vm = new Vue({
  el: '#app',
  data: {
    text: ''
  },
  mounted:function(){
    console.log(123)
    var that=this
    that.$http.get('/data').then((response) => {
      console.log(response.body);
      that.text=JSON.parse(response.body);
    }, (response) => {
      console.log(response)
    });
  }
});



//$.ajax({
//  url: '/data',
//  success: function (data) {
//    vm.text = JSON.parse(data);
//  }
//});





