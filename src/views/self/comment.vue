<template>
  <div class="comment">
    <header>
      <i class="el-icon-arrow-left" @click="goBack"></i>
      评价
    </header>
    <section>
      <ul class="commentCon">
        <li v-for="(good,index) in goodsList" :key="good.goodsId">
          <p>
            <img :src="good.goodsPic" alt />
            {{good.goodsName}}
          </p>
          <p>评价商品</p>
          <el-rate v-model="rateValue[index]" show-score></el-rate>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入对产品的看法,不超过30字"
            v-model="textarea[index]"
            resize="none"
            maxlength="30"
          ></el-input>
        </li>
      </ul>
    </section>
    <footer>
      <button @click="toComment">添加评价</button>
    </footer>
    <checkResult :result='checkResult' @closeThis='close' v-if="isShow"/>
  </div>
</template>
<script>
import myRequest from '../../commonFun';
import checkResult from '../../components/checkResult'
export default {
  name: "Comment",
  data() {
    return {
      userId: "",
      token: "",
      orderId:'',
      rateValue: [],
      textarea: [],
      goodsList: [],
      checkResult:'',
      isShow:false
    };
  },
  components: {
     checkResult   
  },
  mounted() {
    let commentList = localStorage.getItem("commentList");
    commentList = JSON.parse(commentList);
    let orderId=commentList[0].orderInfo.orderId
    let userId = localStorage.getItem("userID");
    let token = localStorage.getItem("token");
    if (userId && token && orderId) {
      this.userId = userId;
      this.token = token;
      this.orderId=orderId
      commentList.forEach((comment, index) => {
        let obj = {};
        obj.goodsName = comment.goodsInfo.goodsName;
        obj.goodsId = comment.goodsInfo.goodsId;
        obj.goodsPic = comment.goodsInfo.goodsIndexImg;
        this.rateValue.push(5);
        this.goodsList.push(obj);
      });
      this.textarea = new Array(commentList.length);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toComment(goods) {
      if (this.userId && this.token) {
        let commentUrl='goodsAddContent?token='+this.token;
        let changeStatusUrl="orderStatus?token=" + this.token;
        this.goodsList.forEach((goods, index) => {
            myRequest('post',commentUrl,{
                userId:this.userId,
                comment:this.textarea[index],
                fraction:this.rateValue[index],
                goodsId:goods.goodsId
            },(res)=>{
               if(res.data.code===3){
                   this.$router.push('/login');
               }else if(res.data.code===1){
                   this.isShow=true;
                   this.checkResult='添加评价成功';
                   let timeOut
                   timeOut=setTimeout(()=>{
                      this.$router.push('/orders')
                       timeOut=null
                   },500)
       
               }else{
                   this.isShow=true;
                   this.checkResult=res.data.errMsg;
               }
            })
        })
        myRequest('post',changeStatusUrl,{ userId: this.userId, orderId: this.orderId, status: "已评价" },(res)=>{
          if(res.data.code===3){
            this.$router.push('/login')
          }else if(res.data.code===2){
             this.isShow=true;
            this.checkResult=res.data.errMsg;
          }
        })
      } else {
        this.$router.push("/login");
      }
    },
    close(val){
        
    }
  }
};
</script>

<style scoped>
.comment {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #f1f0f0;
}
header {
  width: 100%;
  text-align: center;
  height: 45px;
  line-height: 45px;
  font-size: 20px;
  color: #333;
  position: fixed;
  top: 0;
  background: #fff;
}
.el-icon-arrow-left {
  position: absolute;
  left: 10px;
  top: 14px;
  font-size: 20px;
}
section {
  margin-top: 45px;
  margin-bottom: 43px;
}
footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  padding: 10px 0;
  overflow: hidden;
  background: #fff;
  border-top: 1px solid #e2e2e2;
}
footer > button {
  width: 90%;
  height: 40px;
  background: #00c3f5;
  color: #fff;
  border: 0;
}
.commentCon {
  box-sizing: border-box;
  padding: 10px;
}
.commentCon > li {
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}
.commentCon > li > p:nth-of-type(1) {
  color: #666;
  font-size: 18px;
  margin-bottom: 10px;
  width: 290px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
}
.commentCon > li > p:nth-of-type(1) > img {
  width: 35px;
  height: 35px;
  vertical-align: middle;
  border: 1px solid #e2e2e2;
}
.commentCon > li > p:nth-of-type(2) {
  color: #999;
  font-size: 18px;
  text-align: center;
  margin-left: -10px;
}
.el-rate {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-textarea > textarea {
  outline: none;
}
</style>