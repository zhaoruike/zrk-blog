/**
 * Created by zrk on 2016/10/31.
 */
var vm=new Vue({
  el:'#container',
  data:{
    username:'',
    password:'',
  },
  computed:{},
  methods:{
    login:function(){
      var _this=this;
      var pass_filter=/\d+/;
      if(!(pass_filter.test(_this.password))){
        alert('请确认密码');
        return;
      }

        $.ajax({
          url:"/user/login",
          type:'post',
          data:{
            username:_this.username,
            password:hex_md5(_this.password),
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
