<template>
    <div class="serveDetail">
        <div class="serveContent">
       <p>服务说明<i class="el-icon-close" @click="closePage"></i></p>
       <ul class="serveUL">
           <li>
               <p>
                   <i class="el-icon-wallet"></i>
                   <span>花呗分期</span>
               </p>
               <p>
                   花呗分期是由蚂蚁花呗联合魅族商城共同推出的“先购物后付款”的支付体验，支持预支蚂蚁花呗额度，免息期最长可达41天，可选择分3、6、12期还款。
               </p>
           </li>
           <li>
               <p>
                   <i class="el-icon-s-promotion"></i>
                   <span>百城速达</span>
               </p>
               <p>
                   全国105个城市，除特殊情况，当日17点前支付的订单，最迟次日送达。
               </p>
           </li>
           <li>
               <p>
                   <i class="el-icon-truck"></i>
                   <span>顺丰发货</span>
               </p>
               <p>
                  
                该商品顺丰发货，顺丰无法到达的地区会安排转寄其他快递。                       
               </p>
           </li>
           <li>
               <p>
                   <i class="el-icon-sold-out"></i>
                   <span>顺丰发货</span>
               </p>
               <p>
                自您的订单签收7个自然日之内（含），在商品完好（手机产品未激活）的情况下，可进行无理由退货。                       
               </p>
           </li>
       </ul>
        </div>
      <p class="close" @click="closePage">确定</p>
    </div>
</template>
<script>
export default {
    name:'ServeDetail',
    methods:{
        closePage(){
            this.$emit('closeThis',false)
        }
    }
}
</script>

<style scoped>
.serveDetail{
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    z-index: 100;
    background: rgba(0,0,0,0.3);
}
.serveContent{
    position: absolute;
    bottom: 0;
    background: #fff;
    padding: 20px;
}
.serveContent>P{
    text-align: center;
    color: #999;
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 600;
}
.serveContent>P>i{
    float: right;
}
.serveUL{
    margin-bottom: 100px;
}
.serveUL>li{
    color: #999;
    margin-bottom: 10px;
    border-bottom: 1px solid #e2e2e2;
    padding-bottom: 10px;
}
.serveUL>li>P:nth-child(1)>i{
 background: #409eff;
 color:#fff;
padding:2px;
font-size: 18px;
vertical-align: middle;
margin-right: 10px;
border-radius: 5px;
}
.serveUL>li>P:nth-child(1)>span{
    color: #333;
    font-size: 13px;
}
.serveUL>li>P:nth-child(2){
    margin-top: 10px;
    font-size: 10px;
    padding-left: 34px;
}
.close{
    width: 100%;
    background: #409eff;
    position: absolute;
    bottom: 0;
    padding: 15px 0;
    color: #fff;
    text-align: center;
}
</style>