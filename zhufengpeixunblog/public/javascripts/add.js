/**
 * Created by zrk on 2016/11/2.
 */
var vm=new Vue({
  el:'#app',
  data:{
   title:'',
   textArea:'',
  },
  computed:{},
  methods:{
    add:function(){
      var _this=this;

      $.ajax({
        url:"/article/add",
        type:'post',
        data:{
          title:_this.title,
          text:_this.textArea,
          date:new Date().getTime()
        },
        success:function(data){
          var callData=JSON.parse(data);
          alert(JSON.parse(data).message);
          if(callData.code==0){
            window.location.pathname='/';
          }
        }
      });
    }
  },
})