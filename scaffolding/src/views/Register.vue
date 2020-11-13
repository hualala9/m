<template>
    <div>
      <!-- 顶部导航开始 -->
      <mt-header title="学前端,到学问">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <router-link slot="right" to="/login">登录</router-link>
      </mt-header>
      <!-- 顶部导航结束 -->
      <!-- 表单区域开始 -->
      <div>
        <mt-field
          label="用户名"
          placeholder="请输入用户名"
          type="text"
          v-model="username"
          :state="usernameState"
          @blur.native.capture="checkUsername"
        >
        </mt-field>
        <mt-field
          label="密码"
          placeholder="请输入密码"
          type="password"
          v-model="password"
          @blur.native.capture="checkPassword"
        >
        </mt-field>
        <mt-field
          label="确认密码"
          placeholder="请再次输入密码"
          type="password"
          v-model="conpassword"
          @blur.native.capture="checkConpassword">
        </mt-field>
        <mt-button type="primary" size="large" @click="handle">免费注册</mt-button>
      </div>
      <!-- 表单区域结束 -->
    </div>
  </template>
  <script>
export default{
    data() {
    return {
      //用户名、密码及确认密码的变量
      username: "",
      password: "",
      conpassword: "",
      //用户名、密码及确认密码的状态 
      usernameState:''
    };
},
methods:{
    handle(){
        if(this.checkUsername()&&this.checkPassword()&&this.checkConpassword()){
          let object={
            username:this.username,
            password:this.password
          }
            
            this.axios.post('/register',this.qs.stringify(object)).then(res=>{
                if(res.data.code==1){
                    this.$router.push('/');
                }else {
                    this.$messagebox("提示信息","用户已存在");

                }
            })
        }
    },
    checkUsername(){
        let username=this.username;
        let usernameReg= /^[0-9A-Za-z]{6,12}$/;
        if(usernameReg.test(username)){
            this.usernameState='success';
            return true;
        }else {
            this.$toast({
                message:"用户名或者密码错误",
                position:"top",
                duration:5000,
            });
            this.usernameState='error';
            return false;
           
        }
    },
    checkPassword() {
      let password = this.password;
      let passwordReg = /^[0-9A-Za-z\.\-_]{8,15}$/;
      if (passwordReg.test(password)) {
        return true;
      } else {
        this.$toast({
          message: "密码错误",
          position: "middle",
          duration: 5000,
        });
        return false;
      }
    },
    //检测两次密码是否一致
    checkConpassword() {
      //校验两次密码是否一致
      let password = this.password;
      let conpassword = this.conpassword;
      if (password == conpassword) {
        return true;
      } else {
        this.$toast({
          message: "两次密码不一致",
          position: "middle",
          duration: 4000,
        });
        return false;
      }
    },
}
}
  </script>