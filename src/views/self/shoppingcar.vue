<template>
  <div class="shoppingcar">
    <checkResult :result="checkResult" @closeThis="closeThis" v-if="isBuyThese" />
    <header>
      <i class="el-icon-arrow-left" @click="goBack"></i>
      购物车
      <i class="edit" @click="isModifyNum">{{isEditShow}}</i>
    </header>
    <template v-if="!shoppingLists.length">
      <section>
        <div class="emptyCon">
          <img src="../../assets/ddProfile/empty_cart.png" alt />
          <p>空空如也~</p>
          <el-button type="primary" plain round class="toMain" @click="toMain">去逛逛</el-button>
        </div>
        <div class="likeP">
          <div class="title">
            <h3>为你推荐</h3>
            <hr class="colorHr" />
            <span>买了以上产品的人还买了</span>
          </div>
          <ul class="picCon">
            <li>
              <img src="../../assets/mao/classify/classify_01.png" alt="id" />
              <h5>魅族 16s</h5>
            </li>
            <li>
              <img src="../../assets/mao/classify/classify_02.png" alt="id" />
              <h5>魅族 POP2</h5>
            </li>
            <li>
              <img src="../../assets/mao/classify/classify_03.png" alt="id" />
              <h5>魅族 POP2</h5>
            </li>
            <li>
              <img src="../../assets/mao/classify/classify_04.png" alt="id" />
              <h5>魅族 16s</h5>
            </li>
          </ul>
        </div>
      </section>
    </template>
    <template v-else>
      <section>
        <ul class="car">
          <li class="carCon" v-for="(list,index) in shoppingLists" :key="list.goodsId">
            <p>
              <span :class="isPickThisClass(list)" @click="checkThis(index)" ref="product"></span>
            </p>
            <p>
              <img :src="list.goodsPic" alt @click="toSeeThis(list.goodsID)" />
            </p>
            <p>
              <i>{{list.goodsName}}</i>
              <i>{{list.goodsDetail}}</i>
              <span>¥ {{list.goodsPrice+'.00'}}</span>
              <template v-if="isEdit">
                <a>
                  <em @click="incrementGoods(index,list.cartId)">-</em>
                  <span ref="buyNum">{{list.goodsNum}}</span>
                  <em @click="decrementGoods(index,list.cartId)">+</em>
                </a>
              </template>
              <template v-else>
                <a href="javascript:;'">×{{list.goodsNum}}</a>
              </template>
            </p>
          </li>
        </ul>
      </section>
      <footer>
        <span :class="pickAllClass" @click="tryPickAll"></span>
        <span>全选</span>
        <template v-if="!isEdit">
          <el-button type="danger" @click="toBuyIt">结算</el-button>
        </template>
        <template v-else>
          <el-button type="primary" @click="toDeletIt">删除</el-button>
        </template>
        <span>¥ {{totalPrice}}</span>
        <span>总计</span>
      </footer>
    </template>
  </div>
</template>
<script>
import checkResult from "../../components/checkResult";
import myRequest from "../../commonFun";
import { setTimeout } from "timers";
import { timeout } from "q";
export default {
  name: "Shoppingcar",
  components: {
    checkResult
  },
  data() {
    return {
      shoppingLists: [],
      isEdit: false,
      productNum: 1,
      isEditShow: "编辑",
      pickAllClass: "isPickAll",
      isPickAll: false,
      isMounted: false,
      totalPrice: 0,
      pickedCount: 0,
      isBuyThese: false,
      checkResult: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    closeThis(val) {
      this.isBuyThese = val;
    },
    toBuyIt() {
      var buyList = [];
      this.shoppingLists.forEach(list => {
        if (list.checked) {
          let obj = {};
          obj.goodsID = list.goodsID;
          obj.goodsName = list.goodsName;
          obj.goodsDetail = list.goodsDetail;
          obj.goodsPrice = list.goodsPrice;
          obj.goodsNum = list.goodsNum;
          obj.goodsPic = list.goodsPic;
          obj.cartId = list.cartId;
          buyList.push(obj);
        }
      });
      if (buyList.length > 0) {
        let buyListJSON = JSON.stringify(buyList);
        localStorage.setItem("buyType", "cart");
        localStorage.setItem("buyList", buyListJSON);
        this.$router.push("/payfor");
      } else {
        this.isBuyThese = true;
        this.checkResult = "未选中任何商品";
      }
    },
    isPickThisClass(list) {
      if (list.checked) {
        return "surePickThis";
      } else {
        return "isPickThis";
      }
    },
    isModifyNum() {
      this.isEdit = !this.isEdit;
      if (this.isEdit) {
        this.isEditShow = "完成";
      } else {
        this.isEditShow = "编辑";
      }
    },
    checkThis(index) {
      if (this.$refs.product[index].className === "isPickThis") {
        this.shoppingLists[index].checked = true;
      } else {
        this.shoppingLists[index].checked = false;
      }
      let count = 0;
      this.shoppingLists.forEach(item => {
        if (item.checked) {
          count++;
        }
      });
      this.pickedCount = count;
      if (count === this.shoppingLists.length) {
        this.pickAllClass = "pickAll";
      } else {
        this.pickAllClass = "isPickAll";
      }
      this.countPrice();
    },
    tryPickAll() {
      this.isPickAll = !this.isPickAll;
      if (!this.isPickAll || this.pickedCount === this.shoppingLists.length) {
        this.pickAllClass = "isPickAll";
        this.shoppingLists.forEach(item => {
          item.checked = false;
        });
        this.isPickAll = false;
        this.pickedCount = 0;
      } else {
        this.pickAllClass = "pickAll";
        this.shoppingLists.forEach(item => {
          item.checked = true;
        });
        this.pickedCount = this.shoppingLists.length;
        this.isPickAll = true;
      }
      this.countPrice();
    },
    countPrice() {
      let count = 0;
      this.shoppingLists.forEach((item, index) => {
        if (item.checked) {
          let num = this.shoppingLists[index].goodsNum;
          count += this.shoppingLists[index].goodsPrice * 1 * num;
        }
      });
      this.totalPrice = count;
    },
    incrementGoods(index, id) {
      if (this.shoppingLists[index].goodsNum >= 2) {
        if (this.token && this.userId) {
          let deviceUrl =
            "carAddAndDel?token=" + this.token;
          myRequest(
            "post",
            deviceUrl,
            { userId: this.userId, cart_id: id, status: -1 },
            res => {
              if (res.data.code === 3) {
                this.isBuyThese = true;
                this.checkResult = "token失效，请重新登录";
                this.$router.push("/login");
              } else if (res.data.code === 1) {
                this.shoppingLists[index].goodsNum--;
                this.countPrice();
              } else {
                this.isBuyThese = true;
                this.checkResult = res.data.errMsg;
              }
            }
          );
        } else {
          this.isBuyThese = true;
          this.checkResult = "token失效，请重新登录";
          this.$router.push("/login");
        }
      }
    },
    decrementGoods(index, id) {
      if (this.token && this.userId) {
        let deviceUrl =
          "carAddAndDel?token=" + this.token;
        myRequest(
          "post",
          deviceUrl,
          { userId: this.userId, cart_id: id, status: 1 },
          res => {
            if (res.data.code === 3) {
              this.isBuyThese = true;
              this.checkResult = "token失效，请重新登录";
              this.$router.push("/login");
            } else if (res.data.code === 1) {
              this.shoppingLists[index].goodsNum++;
              this.countPrice();
            } else {
              this.isBuyThese = true;
              this.checkResult = res.data.errMsg;
            }
          }
        );
      } else {
        this.isBuyThese = true;
        this.checkResult = "token失效，请重新登录";
        this.$router.push("/login");
      }
    },
    toDeletIt() {
      let deletList = [];
      this.shoppingLists.forEach(list => {
        if (list.checked) {
          deletList.push(list.cartId);
        }
      });
      if (deletList.length > 0) {
        let goodsIds = deletList.join(",");
        if (this.userId && this.token) {
          let delUrl =
            "delCartGoods?token=" + this.token;
          myRequest(
            "post",
            delUrl,
            { userId: this.userId, goodsIds: goodsIds },
            res => {
              if (res.data.code === 3) {
                this.isBuyThese = true;
                this.checkResult = "token失效，请重新登录";
                let timeOut;
                if (!timeOut) {
                  timeOut = setTimeout(() => {
                    this.$router.push("/login");
                    timeOut = null;
                  }, 1000);
                }
              } else if (res.data.code === 1) {
                this.isBuyThese = true;
                this.checkResult = "删除成功！";
                this.shoppingLists = this.shoppingLists.filter(list => {
                  return !list.checked;
                });
                this.isPickAll = false;
                this.pickAllClass = "isPickAll";
              } else {
                this.isBuyThese = true;
                this.checkResult = res.data.errMsg;
              }
            }
          );
        } else {
          this.isBuyThese = true;
          this.checkResult = "未选中任何商品";
          let timeout;
          if (!timeout) {
            timeout = setTimeout(() => {
              this.$router.push("/login");
              timeout = null;
            }, 1000);
          }
        }
      } else {
        this.isBuyThese = true;
        this.checkResult = "未选中任何商品";
      }
    },
    toMain() {
      this.$router.push("/");
    },
    toSeeThis(id) {
      this.$router.push("/gooddetail/" + id);
    }
  },
  mounted() {
    this.isMounted = true;
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userID");
    if (token && userId) {
      this.token = token;
      this.userId = userId;
      let selectUrl = "shopCar?token=" + token;
      myRequest("post", selectUrl, { userId: this.userId }, res => {
        if (res.data.code === 3) {
          this.$router.push("/login");
        } else if (res.data.code === 1) {
          let newArr = [];
          res.data.goods.forEach(good => {
            let obj = {};
            obj.goodsID = good.shopID;
            obj.goodsName = good.name;
            obj.goodsDetail = good.conf;
            obj.goodsPrice = good.price;
            obj.goodsNum = good.num;
            obj.goodsPic = good.img;
            obj.checked = false;
            obj.cartId = good.cartId;
            newArr.push(obj);
          });
          this.shoppingLists = newArr;
        }
      });
    }
  }
};
</script>
<style scoped>
.shoppingcar {
  width: 100%;
  background: #efefef;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
header {
  padding: 10px;
  background: #fff;
  text-align: center;
  font-size: 18px;
  color: #333;
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
section {
  width: 100%;
  background: #fff;
  margin-top: 10px;
  box-sizing: border-box;
  margin-top: 50px;
}
.isPickThis {
  display: block;
  width: 19px;
  height: 19px;
  background: url("../../assets/ddProfile/radio-not-check.png") center no-repeat;
  background-size: cover;
}
.surePickThis {
  display: block;
  width: 19px;
  height: 19px;
  background: url("../../assets/ddProfile/radio-check.png") center no-repeat;
  background-size: cover;
}
.car {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
}
.carCon {
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  padding: 20px 0;
}
.carCon > p > img {
  width: 83px;
  height: 83px;
  margin-left: 15px;
}
.carCon > p:last-child {
  margin-left: 10px;
}
.carCon > p:last-child > i {
  font-style: normal;
  display: block;
  text-align: left;
}
.carCon > p:last-child > i:nth-of-type(1) {
  color: #666;
  margin-bottom: 10px;
  font-size: 18px;
}
.carCon > p:last-child > i:nth-of-type(2) {
  color: #999;
  width: 180px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 10px;
  font-size: 13px;
}
.carCon > p:last-child > span {
  display: block;
  color: #f0415f;
  text-align: left;
  font-size: 13px;
}
.carCon > p:last-child {
  position: relative;
  width: 100%;
}
.carCon > p:last-child > a {
  position: absolute;
  right: 5px;
  bottom: -5px;
  color: #666;
  font-size: 16px;
  border-radius: 10px;
}
.carCon > p:last-child > a > em {
  font-style: normal;
  width: 25px;
  height: 25px;
  border: 1px solid #e2e2e2;
  display: inline-block;
  vertical-align: middle;
  line-height: 25px;
}
.carCon > p:last-child > a > em:nth-of-type(1) {
  border-top-left-radius: 5px;
}
.carCon > p:last-child > a > em:nth-of-type(1) {
  border-bottom-left-radius: 5px;
}
.carCon > p:last-child > a > em:nth-of-type(2) {
  border-top-right-radius: 5px;
}
.carCon > p:last-child > a > em:nth-of-type(2) {
  border-bottom-right-radius: 5px;
}
.carCon > p:last-child > a > span {
  display: inline-block;
  width: 30px;
  height: 25px;
  border: 1px solid #e2e2e2;
  vertical-align: middle;
  line-height: 18px;
  text-align: center;
  color: #999;
  background: #fff;
}
.edit {
  font-style: normal;
  font-size: 13px;
  color: #999;
  position: absolute;
  top: 13px;
  right: 10px;
}
.el-icon-arrow-left {
  font-size: 24px;
  position: absolute;
  left: 10px;
}
footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background: #fff;
  line-height: 45px;
  box-sizing: border-box;
  border-top: 1px solid #e2e2e2;
}
footer > span {
  font-size: 13px;
  color: #666;
}
footer > .isPickAll {
  display: inline-block;
  width: 19px;
  height: 19px;
  vertical-align: middle;
  margin-right: 10px;
  margin-left: 10px;
  background: url("../../assets/ddProfile/radio-not-check.png") center no-repeat;
  background-size: cover;
}
footer > .pickAll {
  display: inline-block;
  width: 19px;
  height: 19px;
  vertical-align: middle;
  margin-right: 10px;
  margin-left: 10px;
  background: url("../../assets/ddProfile/radio-check.png") center no-repeat;
  background-size: cover;
}
.el-button {
  float: right;
  width: 30%;
  height: 45px;
}
footer > span:nth-of-type(3) {
  float: right;
  color: #f0415f;
  margin-right: 10px;
}
footer > span:nth-of-type(4) {
  float: right;
  margin-right: 10px;
}
.emptyCon {
  width: 100%;
  box-sizing: border-box;
  height: 250px;
  position: relative;
}
.emptyCon > img {
  width: 150px;
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  margin: auto;
}
.emptyCon > p {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 160px;
  margin: auto;
  color: #999;
}
.emptyCon > .el-button {
  position: absolute;
  bottom: 5%;
  left: 36%;
  width: 100px;
  height: 35px;
  line-height: 10px;
}
.title {
  width: 100%;
  background: #efefef;
  text-align: center;
  padding: 20px 0;
}
.title > h3 {
  font-size: 18px;
  color: #333;
}
.title > hr {
  width: 20px;
  height: 4px;
  border: 0;
  background: #999;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
.title span {
  color: #999;
  font-size: 12px;
}
.picCon {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
  background: #efefef;
  margin-top: -10px;
}
.picCon > li {
  width: 50%;
  padding: 20px 0;
  background: #fff;
}
.picCon > li:nth-child(odd) {
  width: 49%;
  margin-right: 1%;
}
.picCon > li:nth-child(3),
.picCon > li:nth-child(4) {
  width: 49%;
  margin-top: 1%;
}

.picCon > li > img {
  width: 50%;
}
.picCon > li > h5 {
  font-weight: 500;
  color: #999;
  margin-top: 20px;
}
</style>