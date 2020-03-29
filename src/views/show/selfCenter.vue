<template>
  <div class="selfCenter">
    <header>
      <div v-if="isLogin" @click="toLogin">
        <img src="../../assets/zhang/user2.png" alt />
        <br />
        {{nickname}}
      </div>
      <div @click="toLogin" v-if="!isLogin" class="login">
        <img src="../../assets/zhang/user.png" alt />
        <br />点击登录
      </div>
    </header>
    <ul>
      <li @click="toThisPage('orders')">
        <i class="el-icon-document"></i>
        <span>订单管理</span>
      </li>
      <li @click="toThisPage('address')">
        <i class="el-icon-location-information"></i>
        <span>收货地址</span>
      </li>
      <li @click="toThisPage('collect')">
        <i class="el-icon-star-on"></i>
        <span>我的收藏</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "SelfCenter",
  data: function() {
    return {
      isLogin:false,
      nickname: ""
    };
  },
  mounted() {
    this.nickname = localStorage.getItem("nickname");
    if (this.nickname) {
      this.isLogin = true;
    }
  },
  components: {},
  methods: {
    //跳转路由
    toThisPage(page) {
      this.$router.push("/" + page);
    },
    //去登录
    toLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style  scoped>
header {
  background: url("../../assets/zhang/bg.png") no-repeat center center;
  padding: 50px;
}
header div {
  width: 160px;
  margin: 0 auto;
  text-align: center;
  color: #fff;
  font-size: 20px;
  /* padding: 10px; */
  /* background: papayawhip; */
}
header div > img {
  width: 60px;
  height: 60px;
  border: 1px solid #fff;
  padding: 1px;
  border-radius: 40px;
  margin-bottom: 5px;
}
ul li {
  box-sizing: border-box;
  padding: 20px;
  width: 360px;
  margin: 0 auto;
  border-bottom: 1px solid #ccc;
}
li span {
  line-height: 28px;
}
ul li i {
  font-size: 28px;
  margin-right: 10px;
  vertical-align: top;
}
.el-icon-document {
  color: orange;
}
.el-icon-location-information {
  color: blue;
}
.el-icon-star-on {
  color: blueviolet;
}
</style>