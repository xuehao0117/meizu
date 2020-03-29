<template>
  <div class="collect">
    <CheckResult :result="delResult" @closeThis="closeThis" v-if="isDele" />
    <p class="firstP">
      <i class="el-icon-arrow-left" @click="goback"></i>
      <span class="text">我的收藏</span>
    </p>
    <div class="none_goods" v-if="goodsList.length==0">
      <img src="../../assets/mao/search/search_01.png" alt />
      <p>您暂无收藏哦~</p>
    </div>
    <div class="conter" v-if="goodsList.length!=0">
      <div
        v-for="goods in goodsList"
        :key="goods.goodID"
        class="list"
        @click="goDetail(goods.goodID)"
      >
        <!-- <img :src="goods.url"> -->
        <img :src="goods.ImgUrl" />
        <div class="right">
          <p>{{goods.goodName}}</p>
          <br />
          <p class="detail">
            <span>¥ {{parseFloat(goods.goodPrice)+'.00'}}</span>
            <span>
              <i class="el-icon-delete" @click.stop="deleteThis(goods.goodID)"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myRequest from "../../commonFun";
import CheckResult from "../../components/checkResult";
import { setTimeout } from "timers";
export default {
  name: "Collect",
  components: {
    CheckResult
  },
  data: function() {
    return {
      goodsList: [],
      isDele: false,
      delResult: ""
    };
  },
  methods: {},
  mounted() {
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userID");
    if (token && userId) {
      this.token = token;
      this.userId = userId;
      let collectUrl = "collect?token=" + token;
      myRequest("post", collectUrl, { userId: userId }, res => {
        if (res.data.code === 3) {
          this.$router.push("/login");
        } else if (res.data.code === 1) {
          this.goodsList = res.data.goods;
        }
      });
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    goDetail(id) {
      this.$router.push("/gooddetail/" + id);
    },
    deleteThis(id) {
      if (this.token && this.userId) {
        let deleteUrl =
          "delCollect?token=" + this.token;
        myRequest(
          "post",
          deleteUrl,
          { goodsId: id, userId: this.userId },
          res => {
            if (res.data.code === 3) {
              this.isDele = true;
              this.delResult = "token失效，请重新登录";
              setTimeout(() => {
                this.$router.push("/login");
              }, 500);
            } else if (res.data.code === 1) {
              this.isDele = true;
              this.delResult = "删除成功!";
              this.goodsList=this.goodsList.filter(good=>good.goodID!==id)
            } else {
              this.isDele = true;
              this.delResult = res.data.errMsg;
            }
          }
        );
      } else {
        this.$router.push("/login");
      }
    },
    closeThis(val) {
      this.isDele = val;
    }
  }
};
</script>
<style scoped>
.firstP {
  color: #666;
  border-bottom: 0.5px solid #e2e2e2;
  height: 50px;
  line-height: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #fff;
}
.conter {
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
.none_goods {
  width: 100%;
  margin: 200px auto;
  position: relative;
  text-align: center;
}
.none_goods > img {
  width: 80px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 0;
}
.none_goods > p {
  display: block;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  margin: auto;
  color: #999;
}
.list {
  box-sizing: border-box;
  width: 360px;
  margin: 0 auto;
  padding: 20px 10px;
  border-bottom: 0.5px solid #e2e2e2;
  overflow: hidden;
}
div > img {
  width: 70px;
  height: 70px;
  float: left;
  margin-right: 20px;
  border: 1px solid #e2e2e2;
}
.right > p {
  color: #333;
  font-size: 18px;
}
.detail {
  display: flex;
  justify-content: space-between;
  line-height: 32px;
}
.detail > span {
  color: #999;
}
.el-icon-delete {
  font-size: 24px;
  margin-top: 2px;
  margin-right: 5px;
}
</style>