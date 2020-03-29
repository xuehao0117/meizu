<template>
  <div class="address">
    <Check v-if="isAlertShow" :result="alertText" @closeThis="closeThis" />
    <p class="firstP">
      <i class="el-icon-arrow-left" @click="goback"></i>
      <span class="text">收货地址</span>
    </p>
    <div class="content">
      <div v-if="!existAddress" class="noExist">没有收货地址</div>
      <div v-if="isEdit" id="exist">
        <p>
          <input type="text" ref="name" placeholder="收货人姓名" />
        </p>
        <p>
          <input type="text" ref="phone" placeholder="手机号码" />
        </p>
        <p>
          <input type="text" ref="address" placeholder="收货地址" />
        </p>
      </div>
      <div v-if="!isEdit">
        <div
          v-for="item in addressList"
          :key="item.address"
          class="item"
          @click="choiceAddress(item.name,item.tel,item.addres)"
        >
          <div class="user_add">
            <span>{{item.name}}</span>
            <span>{{item.tel}}</span>
          </div>
          <div class="add_add">
            <span ref="add">{{item.addres}}</span>
            <span>
              <el-button size="mini" round @click.stop="del(`${item.id}`)">删除</el-button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <p class="lastP">
      <el-button type="primary" round @click="add" v-if="!isEdit">新增收货地址</el-button>
    </p>
    <p class="lastP" v-if="isEdit">
      <el-button type="primary" round @click="save" v-if="isEdit">保存</el-button>
    </p>
  </div>
</template>
<script>
import axios from "axios";
import Check from "../../components/checkResult";
var showAddress;
export default {
  name: "Address",
  data: function() {
    return {
      isEdit: false,
      existAddress: true,
      addressList: [],
      alertText: "",
      isAlertShow: false
    };
  },
  components: {
    Check
  },
  mounted() {
    showAddress = () => {
      let userId = localStorage.getItem("userID");
      let token = localStorage.getItem("token");
      let url = `selUserAdd?token=${token}`;
      if (token) {
        axios.post(url, "userId=" + userId).then(result => {
          this.addressList = result.data.address || [];
          if (this.addressList.length == 0) {
            this.existAddress = false;
          }
        });
      }
    };
    showAddress();
  },
  beforeRouteEnter(to, from, next) {
    localStorage.setItem("path_from", from.path);
    next();
  },
  beforeRouteLeave(to, from, next) {
    localStorage.removeItem("path_from");
    next();
  },
  methods: {
    closeThis() {
      this.isAlertShow = false;
    },
    goback() {
      this.$router.go(-1);
    },
    del(id) {
      let userId = localStorage.getItem("userID");
      let token = localStorage.getItem("token");
      let url = `delAddress?token=${token}`;
      axios.post(url, `userId=${userId}&addressId=${id}`).then(result => {
        if (result.data.code === 1) {
          this.isAlertShow = true;
          this.alertText = "删除成功";
          showAddress();
        }
      });
    },
    choiceAddress(name, tel, addres) {
      let path_from = localStorage.getItem("path_from");
      if (path_from == "/payfor") {
        let _myAdderss = JSON.stringify({ name, tel, addres });
        localStorage.setItem("myAddress", _myAdderss);
        this.$router.go(-1);
      }
    },
    save() {
      let name = this.$refs.name.value;
      let tel = this.$refs.phone.value;
      let address = this.$refs.address.value;
      if (name == "") {
        this.isAlertShow = true;
        this.alertText = "收件人不存在";
        return;
      }
      if (tel.trim() == "" || tel.length !== 11 || tel[0] !== "1") {
        this.isAlertShow = true;
        this.alertText = "手机号不正确";
        return;
      }
      if (address.length < 10) {
        this.isAlertShow = true;
        this.alertText = "地址不能少于10个字符";
        return;
      }
      let userId = localStorage.getItem("userID");
      let token = localStorage.getItem("token");
      let url = `addAddres?token=${token}`;
      let str = `userId=${userId}&address=${address}&tel=${tel}&name=${name}`;
      let _this = this;
      if (token) {
        axios.post(url, str).then(result => {
          // console.log(result);
          if (result.data.code === 3) {
            this.isAlertShow = true;
            this.alertText = "登录失效，请重新登录";
            let timeOut;
            if (!timeOut) {
              timeOut = setTimeout(function() {
                _this.$router.push("/login");
                timeOut = null;
              }, 1000);
            }
          }
          if (result.data.code === 1) {
            this.isAlertShow = true;
            this.alertText = "添加成功";
            showAddress();
            this.isEdit = !this.isEdit;
          }
        });
      } else {
        this.isAlertShow = true;
        this.alertText = "请先登录";
        if (!timeOut) {
          timeOut = setTimeout(function() {
            _this.$router.push("/login");
            timeOut = null;
          }, 1000);
        }
      }
    },
    add() {
      this.isEdit = !this.isEdit;
      this.existAddress = true;
    }
  }
};
</script>
<style scoped>
.user_add {
  width: 360px;
  margin: 0 auto;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  color: #666;
  padding: 0 15px;
  box-sizing: border-box;
}
.add_add {
  width: 360px;
  margin: 0 auto;
  line-height: 32px;
  display: flex;
  justify-content: space-between;
  color: #999;
  padding: 0 20px;
  box-sizing: border-box;
  padding-bottom: 10px;
}

p {
  width: 360px;
  margin: 0 auto;
  border-bottom: 1px solid #ccc;
}
.item {
  border-bottom: 1px solid #e2e2e2;
}
p input {
  height: 50px;
  line-height: 50px;
  width: 360px;
  margin: 0 auto;
  border: none;
}
.noExist {
  margin: 200px auto;
  text-align: center;
  width: 200px;
  height: 200px;
}
.firstP {
  color: #666;
  border-bottom: 1px solid #ccc;
  height: 50px;
  line-height: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #fff;
}
.content {
  margin-top: 50px;
}
.firstP i {
  font-size: 25px;
  vertical-align: middle;
  margin: 0 10px;
}
.firstP .text {
  vertical-align: middle;
}
.lastP {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #ccc;
  /* height: 50px; */
  text-align: center;
  background-color: #eee;
}
.lastP > button {
  margin: 8px auto;
  /* height: 34px; */
  width: 180px;
}
.active {
  border-bottom: 2px solid #33f;
}
</style>