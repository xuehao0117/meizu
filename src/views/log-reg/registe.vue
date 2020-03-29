<template>
  <div class="reg">
    <Check v-if="isAlertShow" :result="alertText" @closeThis="closeThis" />
    <p>
      <img src="../../assets/zhang/logo_a.png" alt />
      <br />
      <img src="../../assets/zhang/logo_b.png" alt />
    </p>
    <p>
      <input type="text" ref="user_nickname" placeholder="昵称" />
    </p>
    <p>
      <input type="text" ref="user_phone" placeholder="手机号" />
    </p>
    <p>
      <input type="password" ref="pwd" placeholder="密码" />
    </p>
    <p>
      <input type="password" ref="compwd" placeholder="确认密码" />
    </p>
    <p class="last">
      <button @click="toLogin">注册</button>
    </p>
  </div>
</template>
<script>
import axios from "axios";
import Check from "../../components/checkResult";
export default {
  name: "Reg",
  data: function() {
    return {
      alertText: "",
      isAlertShow: false
    };
  },
  components: {
    Check
  },
  methods: {
    closeThis() {
      this.isAlertShow = false;
    },
    toLogin() {
      let name = this.$refs.user_nickname.value;
      let tel = this.$refs.user_phone.value;
      let pass = this.$refs.pwd.value;
      let compwd = this.$refs.compwd.value;
      //   let _this=this;
      if (name == "") {
        this.isAlertShow = true;
        this.alertText = "昵称不能为空";
        return;
      }
      if (tel.trim() == "" || tel.length !== 11 || tel[0] !== "1") {
        this.isAlertShow = true;
        this.alertText = "请输入11位手机号";
        return;
      }
      if (pass == "") {
        this.isAlertShow = true;
        this.alertText = "请输入密码";
        return;
      }
      if (pass !== compwd) {
        this.isAlertShow = true;
        this.alertText = "两次输入的密码不一致";
        return;
      }
      const url = "regist";
      axios.post(url, `name=${name}&tel=${tel}&pass=${pass}`).then(result => {
        if (result.data.code === 1) {
          this.isAlertShow = true;
          this.alertText = "注册成功";
          setTimeout(() => {
            this.$router.push("/login");
          }, 1000);
        }
        if (result.data.code === 2) {
          this.isAlertShow = true;
          this.alertText = "手机号已存在";
        }
      });
    }
  }
};
</script>
<style scoped>
.reg {
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
  background-color:  #147DF0;
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