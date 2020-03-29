<template>
  <div class="order">
    <p class="firstP">
      <i class="el-icon-arrow-left" @click="goback"></i>
      <span class="text">我的订单-魅族商城</span>
    </p>
    <ul class="nav">
      <li @click="showThis('0')" :class="isPage('0')">待付款</li>
      <li @click="showThis('1')" :class="isPage('1')">待收货</li>
      <li @click="showThis('2')" :class="isPage('2')">已收货</li>
    </ul>
    <div class="content" v-if="realShowList.length">
      <div v-for="goods in realShowList" :key="goods.id" class="list">
        <p class="detail">
          <span>供应商：魅族</span>
          <span>{{goods_state}}</span>
        </p>
        <div v-for="(good,index) in goods" :key="index">
          <div class="middle">
            <!-- <img :src="goods.url"> -->
            <img :src="good.goodsInfo.goodsIndexImg" />
            <div class="right">
              <p>{{good.goodsInfo.goodsName}}</p>
              <p class="introduce">{{good.goodsInfo.goodsIntroduc}}</p>
              <p>¥ {{ good.goodsInfo.goodsPrice+'0'}}</p>
            </div>
          </div>
        </div>
        <div class="bottom" v-if="page=='0'">
          <el-button plain size="mini" @click="cancle(goods[0].orderInfo.orderId)">取消订单</el-button>
          <el-button size="mini" type="danger" plain @click="goPay(goods[0].orderInfo.orderId)">立即付款</el-button>
        </div>
        <div class="bottom" v-if="page=='1'">
          <el-button plain size="mini" @click="chart">联系客服</el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            @click="confrim(goods[0].orderInfo.orderId)"
          >确认收货</el-button>
        </div>
        <div class="bottom" v-if="page=='2'">
          <el-button plain size="mini" @click="deleteThis(goods[0].orderInfo.orderId)">删除订单</el-button>
          <el-button size="mini" type="danger" plain @click="toComent(goods)" v-if="goods[0].orderInfo.goodsStatus==='已收货'">&emsp;评价&emsp;</el-button>
          <el-button size="mini" type="info" plain disabled v-else>&ensp;已评价&ensp;</el-button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="emptyOrder">
        <img src="../../assets/ddProfile/empty_order.png" alt />
        <p>没有订单</p>
        <span @click="toShopping">快去试试下单</span>
      </div>
    </div>
    <CheckResult :result="checkResult" @closeThis="close" v-if="isShow" />
  </div>
</template>

<script>
import myRequest from "../../commonFun";
import CheckResult from "../../components/checkResult";
export default {
  name: "Order",
  components: {
    CheckResult
  },
  data: function() {
    return {
      orderList: [],
      showLsit: [],
      realShowList: [],
      orderType: "0",
      page: "0",
      userId: "",
      token: "",
      checkResult: "",
      isShow: false
    };
  },
  mounted() {
    let userId = localStorage.getItem("userID");
    let token = localStorage.getItem("token");
    if (userId && token) {
      this.userId = userId;
      this.token = token;
      let queryUrl = "order?token=" + this.token;
      myRequest("post", queryUrl, { userId: this.userId }, res => {
        console.log(res)
        if (res.data.code === 3) {
          this.$router.push("/login");
        } else if (res.data.code === 1) {
          this.orderList = res.data.orders;
          this.showLsit = this.orderList.filter(item => {
            return item.orderInfo.goodsStatus === "未支付";
          });
          this.realShowList = this.handleData(this.showLsit);
        } else {
          this.isShow = true;
          this.checkResult = "系统错误";
        }
      });
    }
  },
  computed: {
    goods_state: function() {
      if (this.page == "0") {
        return "待付款";
      } else if (this.page == "1") {
        return "待收货";
      } else if (this.page == "2") {
        return "已收货";
      }
    }
  },
  methods: {
    handleData(list) {
      let newOrderList = [];
      list.sort((a, b) => {
        return a.orderInfo.orderId * 1 - b.orderInfo.orderId * 1;
      });
      let orderIdList = new Set();
      list.forEach(item => {
        orderIdList.add(item.orderInfo.orderId);
      });
      orderIdList = Array.from(orderIdList);
      orderIdList.forEach(orderId => {
        let arr = list.filter(olist => {
          return olist.orderInfo.orderId === orderId;
        });
        newOrderList.push(arr);
      });
      return newOrderList;
    },
    close(val) {
      this.isShow = val;
    },
    goback() {
      this.$router.push("/main/selfcenter");
    },
    goPay(orderId) {
      if (this.userId && this.token) {
        let payUrl = "orderStatus?token=" + this.token;
        this.isShow = true;
        this.checkResult = "支付中...";
        myRequest(
          "post",
          payUrl,
          { userId: this.userId, orderId: orderId, status: "待收货" },
          res => {
            if (res.data.code === 3) {
              this.$router.push("/login");
            } else if (res.data.code === 1) {
              this.isShow = true;
              this.checkResult = "支付成功";
              let orderIdList = this.orderList;
              orderIdList.forEach(order => {
                if (order.orderInfo.orderId === orderId) {
                  order.orderInfo.goodsStatus = "待收货";
                }
              });
              this.orderList = orderIdList;
              this.showLsit = this.orderList.filter(
                item => item.orderInfo.goodsStatus === "未支付"
              );
              this.realShowList = this.handleData(this.showLsit);
            } else {
              this.isShow = true;
              this.checkResult = "支付失败";
            }
          }
        );
      } else {
        this.$router.push("/login");
      }
    },
    chart() {
      this.$router.push("/chart");
    },
    confrim(orderId) {
      if (this.userId && this.token) {
        let payUrl = "orderStatus?token=" + this.token;
        myRequest(
          "post",
          payUrl,
          { userId: this.userId, orderId: orderId, status: "已收货" },
          res => {

            if (res.data.code === 3) {
              this.$router.push("/login");
            } else if (res.data.code === 1) {
              this.isShow = true;
              this.checkResult = "收货成功";
              this.orderList.map(order => {
                if (order.orderInfo.orderId === orderId) {
                  order.orderInfo.goodsStatus = "已收货";
                }
              });
              this.showLsit = this.orderList.filter(
                item => item.orderInfo.goodsStatus === "待收货"
              );
              this.realShowList = this.handleData(this.showLsit);
            } else {
              this.isShow = true;
              this.checkResult = "收货失败";
            }
          }
        );
      } else {
        this.$router.push("/login");
      }
    },
    cancle(id) {
      if (this.token && this.userId) {
      let cancelUrl = "delOrder?token="+this.token;
        myRequest("post", cancelUrl, { orderSn: id, userId:this.userId}, res => {
          if (res.data.code === 3) {
            this.isShow = true;
            this.checkResult = "身份失效,重新登录";
            let timeOut;
            timeOut = setTimeout(() => {
              this.$router.push("/login");
              timeOut = null;
            }, 500);
          } else if (res.data.code === 1) {
            this.isShow = true;
            this.checkResult = "取消成功";
            this.orderList = this.orderList.filter(order => {
              return order.orderInfo.orderId !== id;
            });
            this.showLsit = this.orderList.filter(
              item => item.orderInfo.goodsStatus === "未支付"
            );
            this.realShowList = this.handleData(this.showLsit);
          } else {
            this.isShow = true;
            this.checkResult = res.data.errMsg;
          }
        });
      } else {
        this.$router.push("/login");
      }
    },
    showThis(page) {
      this.page = page;
      if (page === "0") {
        this.showLsit = this.orderList.filter(
          item => item.orderInfo.goodsStatus === "未支付"
        );
        this.realShowList = this.handleData(this.showLsit);
      } else if (page === "1") {
        this.showLsit = this.orderList.filter(item => {
          return item.orderInfo.goodsStatus === "待收货";
        });
        this.realShowList = this.handleData(this.showLsit);
      } else {
        this.showLsit = this.orderList.filter(item => {
          return item.orderInfo.goodsStatus === "已收货" || item.orderInfo.goodsStatus === "已评价";
        });
        this.realShowList = this.handleData(this.showLsit);
      }
    },
    isPage(page) {
      if (page === this.page) {
        return "active";
      } else {
        ("");
      }
    },
    deleteThis(id) {
       if (this.token && this.userId) {
      let cancelUrl = "delOrder?token="+this.token;
        myRequest("post", cancelUrl, { orderSn: id, userId:this.userId}, res => {
          if (res.data.code === 3) {
            this.isShow = true;
            this.checkResult = "身份失效,重新登录";
            let timeOut;
            timeOut = setTimeout(() => {
              this.$router.push("/login");
              timeOut = null;
            }, 500);
          } else if (res.data.code === 1) {
            this.isShow = true;
            this.checkResult = "删除成功";
            this.orderList = this.orderList.filter(order => {
              return order.orderInfo.orderId !== id;
            });
            this.showLsit = this.orderList.filter(
              item => item.orderInfo.goodsStatus === "已收货"
            );
            this.realShowList = this.handleData(this.showLsit);
          } else {
            this.isShow = true;
            this.checkResult = res.data.errMsg;
          }
        });
      } else {
        this.$router.push("/login");
      }
    },
    toShopping() {
      this.$router.push("/main/classify");
    },
    toComent(goods) {
      let commentGood = JSON.stringify(goods);
      localStorage.setItem("commentList", commentGood);
      this.$router.push("/comment");
    }
  }
};
</script>
<style scoped>
.firstP {
  color: #666;
  border-bottom: 1px solid #e2e2e2;
  height: 50px;
  line-height: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #fff;
}

.order {
  background: #f0f0f0;
  min-height: 650px;
}
.firstP i {
  font-size: 25px;
  vertical-align: middle;
  margin: 0 10px;
}
.firstP .text {
  vertical-align: middle;
}
.list {
  box-sizing: border-box;
  width: 360px;
  margin: 5px auto;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 10px;
}
.middle {
  overflow: hidden;
  margin-bottom: 5px;
}
.bottom {
  text-align: right;
  line-height: 30px;
  padding: 10px 0 0 0;
  /* border-top: 1px solid #ccc; */
}

div > img {
  width: 70px;
  height: 70px;
  float: left;
  margin-right: 20px;
}
.right {
  float: left;
  color: #333;
}
.right > p {
  margin: 5px 0;
}
.right > p:nth-of-type(2) {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #999;
}
.right > p:nth-of-type(3) {
  color: #f0415f;
}
.detail {
  display: flex;
  justify-content: space-between;
  line-height: 32px;
  margin-bottom: 10px;
}
.nav {
  margin-top: 50px;
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: space-around;
  padding: 5px 0;
  background: #f0f0f0;
  /* border-radius: 10px; */
}
.nav > li {
  padding: 8px 20px;
  /* border-bottom: 2px solid #fff; */
}
.nav > li.active {
  color: #409eff;
  border-bottom: 2px solid#409EFF;
}
.emptyOrder {
  width: 100%;
  text-align: center;
  position: relative;
  height: 300px;
}
.emptyOrder > * {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 200px;
  height: 200px;
}
.emptyOrder img {
  width: 250px;
}
.emptyOrder > p {
  top: 430px;
  color: #999;
}
.emptyOrder > span {
  top: 500px;
  font-size: 16px;
  color: #409eff;
  cursor: pointer;
}
</style>