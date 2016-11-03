/**
 * Created by zrk on 2016/10/31.
 */
var vm=new Vue({
  el:'#container',
  data:{
    username:'',
    password:'',
    repassword:'',
    email:'',
  },
  computed:{},
  methods:{
    submit:function(){
      var _this=this;
      var email_filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      //var pass_filter=/^(?=.{6,16}$)(?![0-9]+$)(?!.*(.).*\1)[0-9a-zA-Z]+$/;
      var pass_filter=/\d+/;
      if(!(pass_filter.test(_this.password))){
        alert('请确认密码');
        return;
      }

      if(!(pass_filter.test(_this.repassword))){
        alert('请确认密码');
        return;
      }


      if(!(email_filter.test(_this.email))){
        alert('邮箱格式错误！');
        return;
      }

      if(!_this.password===_this.repassword){
        alert('两次密码输入不一致！');
        return;
      }

      if(_this.password===_this.repassword){
        $.ajax({
          url:"/user/reg",
          type:'post',
          data:{
            username:_this.username,
            password:hex_md5(_this.password),
            repassword:hex_md5(_this.repassword),
            email:_this.email,
          },
          success:function(data){
            var callData=JSON.parse(data)
            alert(callData.message);
            if(callData.code==0){
              window.location.pathname='/user/login';
            }else{
              window.location.reload();
            }

          }
        })
      }
    }
  },
})