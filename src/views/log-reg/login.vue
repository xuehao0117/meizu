<template>
  <div class="login">
    <Check v-if="isAlertShow" :result="alertText" @closeThis="closeThis" />
    <p>
      <img src="../../assets/zhang/logo_a.png" alt />
      <br />
      <img src="../../assets/zhang/logo_b.png" alt />
    </p>
    <p>
      <input type="text" ref="user_phone" placeholder="手机号" />
    </p>

    <div v-if="!revisePwd">
      <p>
        <input type="password" ref="pwd" placeholder="密码" />
      </p>
      <p>
        <button @click="login">登录</button>
      </p>
      <p class="last">
        <span @click="toReg">注册</span>
        <span @click="revisePwd=!revisePwd">修改密码</span>
      </p>
    </div>

    <div v-else>
      <p>
        <input type="text" placeholder="旧密码" id="oldpwd" />
      </p>
      <p>
        <input type="password" ref="newpwd" placeholder="新密码" />
      </p>
      <p>
        <input type="password" ref="conpwd" placeholder="确认密码" />
      </p>
      <p>
        <button @click="confrim">确认修改</button>
      </p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Check from "../../components/checkResult";
export default {
  name: "Login",
  data: function() {
    return {
      revisePwd: false,
      alertText: "",
      isAlertShow: false,
      fromPath:''
    };
  },
  components: {
    Check
  },
  methods: {
    closeThis() {
      this.isAlertShow = false;
    },
    toReg() {
      this.$router.push("/registe");
    },
    confrim() {
      //修改密码
      let tel = this.$refs.user_phone.value;
      let oldPass = document.getElementById("oldpwd").value;
      let newPass = this.$refs.newpwd.value;
      let conpwd = this.$refs.conpwd.value;
      if (tel.trim() == "" || tel.length !== 11 || tel[0] !== "1") {
        this.isAlertShow = true;
        this.alertText = "请输入11位手机号";
        return;
      }
      if (oldPass === "") {
        this.isAlertShow = true;
        this.alertText = "密码为空";
        return;
      }
      if (oldPass === newPass) {
        this.isAlertShow = true;
        this.alertText = "新密码与旧密码相同";
        return;
      }
      if (newPass == "") {
        this.isAlertShow = true;
        this.alertText = "新密码为空";
        return;
      }
      if (newPass !== conpwd) {
        this.isAlertShow = true;
        this.alertText = "两次输入的修改后密码不一致";
        return;
      }
      let url = "MeiZu/updatePass";
      axios
        .post(url, `tel=${tel}&newPass=${newPass}&oldPass=${oldPass}`)
        .then(result => {
          if (result.data.code === 1) {
            this.isAlertShow = true;
            this.alertText = "修改成功";
            this.revisePwd = false;
          }
          if (result.data.code === 2) {
            this.isAlertShow = true;
            this.alertText = "账户密码不匹配";
          }
        });
    },
    login() {
      //登录
      let user = this.$refs.user_phone.value;
      let pass = this.$refs.pwd.value;
      if (user === "") {
        this.isAlertShow = true;
        this.alertText = "手机号为空";
        return;
      }
      if (pass === "") {
        this.isAlertShow = true;
        this.alertText = "密码为空";
        return;
      }
      let url = "login";
      axios.post(url, `user=${user}&pass=${pass}`).then(result => {
        if (result.data.code === 1) {
          localStorage.setItem("userID", result.data.userID);
          localStorage.setItem("nickname", result.data.name);
          localStorage.setItem("token", result.data.token);
          this.isAlertShow = true;
          this.alertText = "登录成功！";
          if(this.fromPath==='/registe'){
            this.$router.push('/');
          }else{
              this.$router.go(-1);
          }
        }
        if (result.data.code === 2) {
          this.isAlertShow = true;
          this.alertText = "登录失败";
        }
      });
    },
  },
  beforeRouteEnter(to, from, next){
   next(vm=>{
     vm.fromPath=from.path
   })  
  }
};
</script>
<style scoped>
.login {
  padding-top: 50px;
}
p {
  margin: 20px auto;
  width: 290px;
  text-align: center;
}
p > input {
  width: 290px;
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding-left: 10px;
  box-sizing: border-box;
}
p > button {
  width: 290px;
  height: 35px;
  border-radius: 15px;
  background-color: #147DF0;
  color: #fff;
  border: none;
  margin: 0 auto;
  outline: none;
}
.last {
  display: flex;
  justify-content: space-between;
  color:  #147DF0;
}
p > img {
  width: 100px;
  margin: 0 auto;
}
</style>