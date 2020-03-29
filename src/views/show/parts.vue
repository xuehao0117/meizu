<template>
    <div class="Parts">
        <div class="showImg">
            <img src="https://openfile.meizu.com/group1/M00/06/FC/Cgbj0VwtzU2AEp14AAF565TOmGQ380.jpg" alt="">
        </div>
        <!-- 推荐区域 -->
        <div class="recommend">
            <h3>推荐</h3>
            <img src="../../assets/mao/xhxls.png" alt="">
        </div>
        <!-- goods -->
        <div class="goodsWrap">
            <a href="javascript:;" @click="toDetail(part.goodsID)" v-for="part in parts" :key="part.goodsID">
                <img :src="part.indexImg" alt="">
                <span>{{part.goodsName}}</span>
            </a>
            <!-- <a href="javascript:;" @click="toDetail()">
                <img src="https://storeimg.meizu.com/product/1458617159-29477.png@240x240.png" alt="">
                <span>魅族&emsp13;16th Plus</span>
            </a> -->

        </div>
    </div>
</template>
<script>
import myRequest from '../../commonFun';//兼容手机端的axiso

export default {
    name:'Parts',
        data(){
        return{
            parts:[]
        }
    },
    methods:{
    toDetail(goodsID){
        this.$router.push('/gooddetail/'+ goodsID);
    }
    },
    mounted(){
        //请求手机数据
        const url = `goodsInfo`
        myRequest('post',url,{goodsType:'配件',sortType:1},(res)=>{
        // console.log(res)
        this.parts = res.data.goods.splice(0,6);
        
      })
    }
}
</script>

<style scoped>
  *{
    padding: 0;
    margin: 0;
    font-size: 12PX;
    box-sizing: border-box;
  }
  a{
    color:#000;
  }
  img{
    vertical-align: top;
  }
.Parts{
    overflow: hidden;
}
.showImg{
    padding:  15px;
    width: 100%;
    text-align: center;
    
}
.showImg img{
    width: 95%;
}
/* 推荐区域 */
.recommend{
    width: 100%;
    text-align: center;
    margin: 10px 0;
}
.recommend h3{
    font-size: 14px;

}
.recommend img{
    width: 20px;
    margin-top: 5px;
}
/*  goods*/
.goodsWrap{
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
.goodsWrap a{
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.goodsWrap img{
    width: 80px;
    height: 80px;
    margin: 10px 0;
}
.goodsWrap span{
    display: inline-block;
    width: 80px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:1;
    overflow: hidden;
}
</style>