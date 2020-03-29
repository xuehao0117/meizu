<template>
  <div class="shoppingcar">
    <Check v-if="isAlertShow" :result="alertText" @closeThis="closeThis" />
    <p class="firstP">
      <i class="el-icon-arrow-left" @click="goback"></i>
      <span class="text">确认订单-魅族商城</span>
    </p>
    <div class="content">
      <div class="address" @click="choiceAddress">
        <div>
          <p>
            <span>{{myAddress?myAddress.name:""}}</span>
            <span>{{myAddress?myAddress.tel:""}}</span>
          </p>
          <p>{{myAddress?'收货地址：'+myAddress.addres:"选择收货地址"}}</p>
        </div>
        <div>
          <i class="el-icon-arrow-right"></i>
        </div>
        <img src="../../assets/zhang/line.png" alt="">
      </div>


      <div class="detail">
        <p>供应商：魅族</p>
        <p v-for="goods in shoppingLists" :key="goods.goodsID">
            <ul>
                <li>
                <img :src="goods.goodsPic" alt="">
                <div class="right">
                    <p><span>{{goods.goodsName}}</span><span>X{{goods.goodsNum}}</span> </p>
                    <p>{{goods.goodsDetail}}</p>
                    <p>￥ {{parseFloat(goods.goodsPrice)+'.00'}}</p>
                </div>
                </li>
            </ul>
        </p>
        <p>配送方式：快递配送(运费￥0.00)</p>
        <P class="piao">
          <span>发票类型：</span>
          <span>电子发票</span>
        </P>
        <P class="piao2">
          <span>发票抬头</span>
          <span>个人</span>
        </P>
        <p>抬头全称:&emsp;{{nickname}}</p>
        <p>
          买家留言
          <input class="info" type="text" placeholder="备注信息"/>
        </p>
      </div>
    </div>
    <footer>
      <p>
        <span>总计:</span>
        <span> ¥ {{totalPrice}}</span>
      </p>
      <p>
        <el-button type="danger" @click="toBuyIt">下单并支付</el-button>
      </p>
    </footer>
    <!-- 下面是弹出层 -->
    <div class="payMoney" v-if="isShow">
      <div class="payMoneyCon">
      <p>您需要支付：</p>
      <p>￥{{totalPrice}}</p>
      <span class="calcle" @click="cancle"><i class="el-icon-close"></i></span>
      <p class="confrim" @click="confrim">确认支付</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Check from "../../components/checkResult";
import myRequest from '../../commonFun';
export default {
  name: "PayFor",
  data: function() {
    return {
      shoppingLists: [],
      isShow:false,
      myAddress:{},
      alertText: "",
      isAlertShow: false,
      nickname:"",
      userId:'',
      token:''
    };
  },
  computed: {
    totalPrice(){
      let count=0;
      this.shoppingLists.forEach(shop=>{
        count+=(shop.goodsPrice*1)*(shop.goodsNum*1)
      })
      return count.toFixed(2)
    }
  },
  methods: {
    closeThis() {
      this.isAlertShow = false;
    },
    choiceAddress(){
      this.$router.push('/address')
    },
    goback() {
      this.$router.go(-1);
    },
    toBuyIt(){
      if(!this.myAddress){
        this.isAlertShow = true;
        this.alertText = "请选择收货地址";
        return;
      }
      this.isShow=!this.isShow;
    },
    toPayMoney(type){
      let questType=localStorage.getItem('buyType')
      if(questType==='detail'){
         if(this.userId && this.token){
            let shopId=this.shoppingLists[0].goodsID
            let addressId=this.myAddress.id
            let payUrl=`addorder?token=${this.token}`;
              this.isAlertShow = true;
              this.alertText = '支付处理中...';
            myRequest('post',payUrl,{userId:this.userId,shopId:shopId,shopNum:1,addressId:addressId,statusId:type},(res)=>{
              if(res.data.code===3){
                this.$router.push('/login')
              }else if(res.data.code===1){
                 let timeOut
                 timeOut=setTimeout(()=>{
                  localStorage.removeItem('buyList')
                   this.$router.push('/orders')
                   timeOut=null
                 },500)
              }else{
                 this.isAlertShow = true;
                 this.alertText = res.data.errMsg;
              }
            })
         }else{
           this.$router.push('/login')
         }
      }else if(questType==='cart'){
         if(this.userId && this.token){
         let cartId=[]
        this.shoppingLists.forEach(shop=>{
         cartId.push(shop.cartId)
        })
       cartId=cartId.join(',');
        let payUrl=`cartAddOrder?token=${this.token}`
         this.isAlertShow = true;
         this.alertText = '支付处理中...';
        myRequest('post',payUrl,{userId:this.userId,cartId:cartId,addressId:this.myAddress.id,status:type},(res)=>{
         if(res.data.code===3){
           this.isAlertShow = true;
           this.alertText = "身份失效，重新登录";
           let timeOut
           timeOut=setTimeout(()=>{
             this.$router.push('/login')
             timeOut=null
           })
         }else if(res.data.code===1){
             let timeOut
                 timeOut=setTimeout(()=>{
                   localStorage.removeItem('buyList')
                   this.$router.push('/orders')
                   timeOut=null
                 },500)
              
           }else{
              this.isAlertShow = true;
             this.alertText =res.data.errMsg;
           }
        })
      }else{
        this.$router.push('/login')
      }
      }else{
         this.isAlertShow = true;
        this.alertText = "系统异常";
      }
      this.isShow=!this.isShow;
    },
    cancle(){
     this.toPayMoney(0)
    },
    confrim(){
      this.toPayMoney(1)
    }
  },
  components:{
    Check
  },
  mounted() {
    //获取收货地址
    this.nickname=localStorage.getItem('nickname')
    let _myAddress=localStorage.getItem('myAddress')
    if(_myAddress){
      this.myAddress=JSON.parse(_myAddress);
    }else{
      let userId = localStorage.getItem("userID");
      let token = localStorage.getItem("token");
      if(userId && token){
        this.userId=userId
        this.token=token
      }
      let url = `selUserAdd?token=${token}`;
      if (token) {
        axios.post(url, "userId=" + userId).then(result => {
          if(result.data.code===3){
            this.$router.push('/login')
          }else if(result.data.code===1){
            this.myAddress= result.data.address[0]
          }
        });
      }
    }
    //获取订单信息
    let buylList=localStorage.getItem('buyList')
    buylList=JSON.parse(buylList)
    this.shoppingLists=buylList;
  },
  beforeRouteLeave(to,from,next){
    localStorage.removeItem('myAddress');
    next();
  },
  
};
</script>
<style scoped>
.firstP {
  color: #666;
  border-bottom: 1px solid #ccc;
  height: 50px;
  line-height: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  background-color:#fff;
  z-index: 999;
}
.firstP i {
  font-size: 25px;
  vertical-align: middle;
  margin: 0 10px;
}
.firstP .text {
  vertical-align: middle;
}
.content {
  margin-top: 50px;
}
footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: fixed;
  background-color: #fff;
  bottom: 0;
  left: 0;
  overflow: hidden;
  line-height: 42px;
  box-sizing: border-box;
  border-top: 1px solid #e2e2e2;
  padding-left: 10px;
}
footer > p > span:nth-of-type(1) {
  color: #333;
}
footer > p > span:nth-of-type(2) {
  color: #f04360;
}
.address {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  overflow: hidden;
  border: none;
  margin-bottom: 15px;
  position: relative;
  color: #333;
}
.address>img{
  position: absolute;
  width: 100%;
  height: 4px;
  bottom:0;
  left: 0;
}
.address > div:nth-of-type(1) {
  float: left;
  width: 320px;
}
.address > div:nth-of-type(2) {
  float: right;
  height: 52px;
  line-height: 52px;
}
.address > div > p:nth-of-type(1) {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}
.address > div > p:nth-of-type(2) {
  margin-bottom: 10px;
}
.detail > p {
  padding: 10px;
  color:#666;
  overflow: hidden;
}
.detail > p:nth-child(1){
  color: #666;
  border-bottom: 1px solid #e2e2e2;
}
.piao,.piao2{
    display: flex;
    justify-content: space-between;
}
.info{
    height: 35px;
    border: none;
    vertical-align: middle;
}
p img{
  width: 75px;
  height: 75px;
  border:1px solid #e2e2e2;
  float: left;
  margin-right: 20px;
}
.right{
    float: left;
    width: 250px;
}
.right>p{
    margin: 5px;
}
.right>p:nth-of-type(1){
  color: #333;
    display: flex;
    justify-content: space-between;
}
.right>p:nth-of-type(1)>span:nth-child(2){
  font-size: 12px;
  color: #999;
}
.right>p:nth-of-type(2){
  color: #999;
  font-size: 14px;
  /* display: flex;
  justify-content: space-between; */
  width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

}
.right>p:nth-of-type(3){
    color: #f04360;
    font-size: 14px;
}
.payMoney{
  position: absolute;
  top: 0;
  width: 100%;
  height: 750px;
  z-index: 100;
  background: rgba(255,255,255,0.7)
}
.payMoneyCon{
  width: 100%;
  height: 240px;
  border-top: 2px solid #e2e2e2;
  position: fixed;
  bottom: 0;
  padding: 50px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10px;
  color: #666;
}
.confrim{
position: absolute;
bottom: 20px;
left: 50%;
transform: translateX(-50%);
height: 40px;
line-height: 40px;
width:290px;
background-color: #00c3f5;
border-radius: 20px;
color: #fff;
}
.payMoneyCon> p{
  margin: 0 auto;
  text-align: center;
  font-size: 18px;
}
.payMoneyCon> p:nth-of-type(2){
  text-align: center;
  margin-right: 10px;
  margin-top: 20px;
  color: #f04360;
  letter-spacing: 2px;
}
.calcle{
  position: absolute;
  top:10px;
  right: 20px;
  font-size: 14px;
}

</style>