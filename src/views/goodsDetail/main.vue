<template>
  <div class="main">
    <CheckResult v-if="isAddGood" :result="checkResult" @closeThis="closeThis" />
    <header>
      <i class="el-icon-arrow-left" @click="goBack"></i>
      <i class="el-icon-shopping-bag-2" @click="toIndex"></i>
    </header>
    <section>
      <div ref="swiper" class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(img,index) in goodImg" :key="index">
            <img :src="img" />
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <div class="content">
        <div class="descri">
          <p>{{goodsBasicMsg.goodsName}}</p>
          <p>¥ {{parseFloat(goodsBasicMsg.goodPrice).toFixed(2)}}</p>
          <p>{{goodsBasicMsg.introduc}}</p>
        </div>
        <div class="serve" @click="isShowDetail">
          <span>
            <i class="el-icon-circle-check"></i>花呗分期
          </span>
          <span>
            <i class="el-icon-circle-check"></i>顺丰发货
          </span>
          <span>
            <i class="el-icon-circle-check"></i>百城速达
          </span>
          <p>
            <i class="el-icon-circle-check"></i>
            <span>7天无理由退货（激活后不支持）</span>
          </p>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="style">
        <span>已选</span>
        <span>全网通公开版.官方标配&emsp;&emsp;×1</span>
      </div>
      <div class="address">
        <p>
          <span>配送</span>
          <span>湖北省 武汉市</span>
        </p>
        <p>
          <i class="el-icon-s-promotion">次日达</i>
          <span>19:00前支付，预计明天({{sendDate}})送达</span>
        </p>
        <p>
          <span>本商品由魅族负责发货并提供售后服务</span>
        </p>
      </div>
      <div class="showProduct">
        <ul class="nav">
          <li @click="isPic" :class="isActive('isPic')">图文详情</li>
          <li @click="isTalk" :class="isActive('isTalk')">商品评价</li>
        </ul>
        <div class="picBox" v-if="isPicOrTalk==='isPic'">
          <ul class="bigPic">
            <li v-for="(img,index) in goodsBigPic" :key="index">
              <img :src="img" />
            </li>
          </ul>
        </div>
        <div class="talkBox" v-else>
          <ul class="talkCon" v-if="commentList.length">
            <li v-for="(talk,index) in commentList" :key="index">
              <div>
                <p>
                  <img src="../../assets/zhang/user2.png" alt />
                </p>
                <p>
                  <span>{{talk.name}}</span>
                  <span>{{(talk.time)}}</span>
                  <el-rate v-model="talk.fraction" disabled text-color="#ff9900"></el-rate>
                </p>
              </div>
              <p class="talk">{{talk.content===undefined?'该用户暂未评价':talk.content}}</p>
            </li>
          </ul>
        </div>
      </div>
      <ServeDetail v-if="isShow" @closeThis="closeServe" />
    </section>
    <footer>
      <ul>
        <li class="updateColor" @click="toChart">
          <i class="el-icon-service"></i>
          客服
        </li>
        <li class="updateColor" @click="collectThis">
          <i :class="isCollectActive"></i>
          收藏
        </li>
        <li class="updateColor" @click="toShoppingcar">
          <i class="el-icon-shopping-cart-2"></i>
          购物车
        </li>
        <li>
          <el-button class="Btn" type="primary" @click="addGoodsToCart">加入购物车</el-button>
        </li>
        <li>
          <el-button type="danger" @click="toBuyIt">立即购买</el-button>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import ServeDetail from "../../components/showServeDetail";
import CheckResult from "../../components/checkResult";
import { setTimeout } from "timers";
import myRequest from "../../commonFun";
export default {
  name: "GoodDetail",
  components: {
    ServeDetail,
    CheckResult
  },
  data() {
    return {
      goodImg: [
        require("../../assets/ddProfile/phone1.jpg"),
        require("../../assets/ddProfile/phone2.jpg"),
        require("../../assets/ddProfile/phone2.jpg"),
        require("../../assets/ddProfile/phone1.jpg")
      ],
      goodsBasicMsg: {
        goodsName: "魅蓝 S6",
        goodPrice: "999.00",
        introduc: "【限时领券优惠200元】Exynos 7872疾速游戏芯片 侧面指纹解锁"
      },
      goodsBigPic: [
        require("../../assets/ddProfile/showPhone.jpg"),
        require("../../assets/ddProfile/showPhone.jpg"),
        require("../../assets/ddProfile/showPhone.jpg")
      ],
      userTalk: [],
      sendDate:
        new Date().getMonth() + 1 + "月" + (new Date().getDate() + 1) + "日",
      isPicOrTalk: "isPic",
      isShow: false,
      isCollectActive: "el-icon-star-on",
      isCollect: false,
      isAddGood: false,
      checkResult: "加入成功！",
      token: "",
      userId: "",
      commentList:[
         {
          name:'daidai',
          time:'2019-8-12',
          fraction:5,
          content:'该用户没有填写评价'
          }
      ]
    };
  },
  methods: {
    //跳转购物车
    toShoppingcar() {
      this.$router.push("/shoppingcar");
    },
    //跳转结算页
    toBuyIt() {
      let copyMsg = [];
      let obj = {};
      obj.goodsID = this.goodsBasicMsg.goodsID;
      obj.goodsName = this.goodsBasicMsg.goodsName;
      obj.goodsDetail = this.goodsBasicMsg.introduc;
      obj.goodsPrice = this.goodsBasicMsg.goodPrice;
      obj.goodsNum = 1;
      obj.goodsPic = this.goodsBasicMsg.indexImg;
      copyMsg.push(obj);
      copyMsg = JSON.stringify(copyMsg);
      localStorage.setItem("buyType", "detail");
      localStorage.setItem("buyList", copyMsg);
      this.$router.push("/payfor");
    },
    isPic() {
      this.isPicOrTalk = "isPic";
    },
    isTalk() {
      this.isPicOrTalk = "isTalk";
    },
    isActive(key) {
      if (this.isPicOrTalk === key) {
        return "collect-active";
      } else {
        return "";
      }
    },
    isShowDetail() {
      this.isShow = !this.isShow;
    },
    closeServe(value) {
      this.isShow = value;
    },
    goBack() {
      this.$router.go(-1);
    },
    toIndex() {
      this.$router.push("/main");
    },
    toChart() {
      this.$router.push("/chart");
    },
    collectThis() {
      if (this.userId && this.token) {
        let url = "addCollect?token=" + this.token;
        myRequest(
          "post",
          url,
          { userId: this.userId, shopId: this.$route.params.id },
          res => {
            if (res.data.code === 3 || res.data.errMsg === "token超时") {
              this.isAddGood = true;
              this.checkResult = "信息失效，请重新登录";
              this.$router.push("/login");
            } else if (res.data.code === 1) {
              this.isCollect = true;
              this.isCollectActive = "el-icon-star-on collect-active";
              this.isAddGood = true;
              this.checkResult = "收藏成功";
            } else {
              this.isAddGood = true;
              this.checkResult = res.data.errMsg;
            }
          }
        );
      }
    },
    addGoodsToCart() {
      if (this.userId && this.token && this.$route.params.id) {
        let addUrl = "addShopCart?token=" + this.token;
        myRequest(
          "post",
          addUrl,
          { userId: this.userId, shopId: this.$route.params.id },
          res => {
            if (res.data.code === 3) {
              this.isAddGood = true;
              this.checkResult = "token失效,请先登录";
              let timeOut
              if(!timeOut){
               timeOut= setTimeout(() => {
                  this.$router.push("/login");
                  timeOut=null
                }, 300);
              }
            } else if (res.data.code === 1) {
              this.isAddGood = true;
              this.checkResult = "添加成功";
            } else {
              this.isAddGood = true;
              this.checkResult = res.data.errMsg;
            }
          }
        );
      } else {
        this.isAddGood = true;
        this.checkResult = "身份失效，重新登录";
        this.$router.push("/login");
      }
    },
    closeThis(value) {
      this.isAddGood = false;
    }
  },
  mounted() {
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userID");
    let id = this.$route.params.id;

    if (id) {
      if (token && userId) {
        this.token = token;
        this.userId = userId;
        let collectUrl = "collect?token=" + token;
        myRequest("post", collectUrl, { userId: userId }, res => {
          if (res.data.code === 3) {
            this.isAddGood = true;
            this.checkResult = "请重新登录";
            let timeOut
            if (!timeOut) {
              timeOut = setTimeout(() => {
                this.$router.push("/login");
                timeOut = null;
              }, 1000);
            }
          } else if (res.data.code === 1) {
            let collectList = res.data.goods;
            let findResult = collectList.findIndex(
              item => item.goodID === Number(id)
            );
            if (findResult > -1) {
              this.isCollect = true;
              this.isCollectActive = "el-icon-star-on collect-active";
            }
          } else {
            this.isAddGood = true;
            this.checkResult = res.data.errMsg;
          }
        });
      }
      let goodsUrl = "goodsDetailInfo";
      myRequest("post", goodsUrl, { goodsId: id }, res => {
        if (res.data.code === 1) {
          this.goodImg = res.data.goodsCarousel;
          this.goodsBigPic = res.data.goodsDitailPic;
          this.goodsBasicMsg = res.data.goodsInfo[0];
          if(res.data.comment.length>0){
            this.commentList=[ ...this.commentList,...res.data.comment];
          }
        } else {
          this.isAddGood = true;
          this.checkResult = res.data.errMsg;
        }
      });
    }

    //显示页面传递的商品id进行请求,显示页面信息

    if (id) {
    }
    let container = this.$refs.swiper;
    new Swiper(container, {
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      paginationClickable: true
    });
  },
  updated() {
    // console.log("update");
  }
};
</script>
<style scoped >
.main {
  width: 100%;
  overflow: hidden;
  background: #efefef;
}
header {
  padding: 10px 16px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
}
header > i {
  font-size: 24px;
}
.el-icon-shopping-bag-2 {
  display: inline-block;
  color: #999;
  margin-left: 280px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  padding: 5px;
}
section {
  margin-bottom: 45px;
}
footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
}
footer > ul {
  display: flex;
  text-align: center;
  border-top: 1px solid #e2e2e2;
}
footer > ul > li {
  flex: 1;
  font-size: 14px;
  align-self: center;
}
footer > ul > li > i {
  display: block;
  font-size: 18px;
}
.el-icon-service {
  color: #409eff;
}
.updateColor {
  color: #999;
  border-right: 1px solid #e2e2e2;
}
.swiper-slide {
  text-align: center;
}
.swiper-container {
  width: 100%;
  height: 280px;
  background: #fff;
  border-bottom: 1px solid #e2e2e2;
}
.swiper-slide img {
  text-align: center;
  width: 50%;
  vertical-align: middle;
  margin-top: 50px;
  height: 200px;
}
.content {
  padding: 10px;
  background: #fff;
}
.descri {
  width: 100%;
  border-bottom: 1px solid #e2e2e2;
}
.descri > p:nth-child(1) {
  color: #333;
  font-size: 18px;
  line-height: 32px;
}
.descri > p:nth-child(2) {
  color: #f0415f;
  font-size: 18px;
  line-height: 32px;
}
.descri > p:nth-child(3) {
  color: #999;
  font-size: 13px;
  line-height: 26px;
  margin-bottom: 10px;
}

.serve {
  padding: 10px 0;
  color: #666;
  line-height: 18px;
  position: relative;
}
.serve span {
  font-size: 12px;
  margin-right: 8px;
}
.serve > p {
  margin-top: 10px;
}
.el-icon-circle-check {
  color: #409eff;
  margin-right: 5px;
  vertical-align: middle;
}
.style {
  padding: 10px;
  margin-top: 10px;
  background: #fff;
}
.style > span:nth-child(1) {
  color: #999;
  font-size: 13px;
  margin-right: 10px;
}
.style > span:nth-child(2) {
  color: #333;
  font-size: 13px;
  margin-right: 10px;
}
.address {
  padding: 10px;
  margin-top: 10px;
  background: #fff;
}
.address > p:nth-of-type(1) {
  border-bottom: 1px solid #e2e2e2;
  padding-bottom: 10px;
}
.address > p:nth-of-type(1) > span:nth-child(1) {
  color: #999;
  font-size: 13px;
  margin-right: 10px;
}
.address > p:nth-of-type(1) > span:nth-child(2) {
  color: #333;
  font-size: 13px;
}
.address > p:nth-of-type(2) {
  padding: 10px 0;
  padding-left: 35px;
}
.address > p:nth-of-type(2) > i {
  color: #409eff;
  border: 1px solid #409eff;
  font-size: 10px;
  padding: 1px;
  vertical-align: middle;
  margin-right: 10px;
}
.address > p:nth-of-type(2) > span {
  color: #666;
  font-size: 13px;
}
.address > p:nth-of-type(3) > span {
  color: #666;
  font-size: 13px;
  padding: 10px;
  padding-left: 35px;
}
.showProduct {
  width: 100%;
  margin-top: 10px;
  background: #fff;
}
.nav {
  display: flex;
  text-align: center;
  border-bottom: 1px solid #e2e2e2;
}
.nav > li {
  flex: 1;
  padding: 10px 0;
  font-size: 13px;
  color: #666;
}
.nav > .active {
  color: #409eff;
}
.bigPic {
  width: 100%;
}
.bigPic > li {
  width: 100%;
}
.bigPic > li > img {
  width: 100%;
}
.talkBox {
  padding: 10px;
}

.talkCon > li {
  padding: 10px 0;
  border-bottom: 1px solid #e2e2e2;
}
.talkCon > li > div > p:nth-child(1) {
  float: left;
  margin-right: 12px;
}
.talkCon > li > div > p:nth-child(1) > img {
  width: 22px;
  vertical-align: middle;
  padding: 5px;
  border: 1px solid #e2e2e2;
  border-radius: 50%;
  background: #e2e2e2;
}
.talkCon > li > div > p:nth-child(2) {
  overflow: hidden;
}
.talkCon > li > div > p:nth-child(2) > span:nth-child(1) {
  float: left;
  font-size: 10px;
  color: #333;
  margin-left: 5px;
  margin-bottom: 2px;
}
.talkCon > li > div > p:nth-child(2) > span:nth-child(2) {
  float: right;
  margin-right: 10px;
  font-size: 10px;
  color: #666;
}
.el-rate {
  clear: both;
  margin-top: 4px;
  font-size: 12px;
}
.talk {
  padding: 10px;
  padding-left: 40px;
  font-size: 12px;
  color: #333;
  margin-right: 10px;
}
.el-icon-arrow-right {
  position: absolute;
  top: 13px;
  right: 10px;
}
.collect-active {
  color: orange;
}
</style>