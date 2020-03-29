<template>
    <div class="searchResult">
        <!-- 顶部搜索框 -->
        <div class="search">
            <!-- {{this.show}} -->
            <i @click="search_return()" class="el-icon-arrow-left icon_return"></i>
            <p  class="el-icon-search icon_search">
                <i class="position" @click.stop="searchval()"></i>
                <input @focus='focus()' v-model="input" type="text"></p>
            <a class="btn_search" @click="searchval()" href="javascript:;">搜索</a>
        </div>
        <!-- 主内容 -->
        <div class="main">
            <!-- 排序 -->
            <div class="sortWrap">
                <a href="javascript:;" @click="toActive(1)"  :class="isActive(1)">
                    综合排序
                </a>
                <a href="javascript:;" @click="toActive(2)"  :class="isActive(2)">
                    价格
                    <i class="el-icon-d-caret"></i>
                </a>
                <a href="javascript:;" @click="toActive(3)"  :class="isActive(3)">
                    销量
                    <i class="el-icon-caret-bottom"></i>
                </a>
            </div>
            <!-- 搜索无内容时 -->
            <div v-show='this.isnullvalue' class="content_empty">
                <p>请尝试搜索其他关键字</p> 
            </div>
            <!-- 有内容搜索有内容时 -->
            <div v-show="!this.isnullvalue" class="content">
                <a href="javascript:;" v-for="search_counent in search_counents" :key="search_counent.goodsID" @click="toDetail(search_counent.goodsID)">
                    <img :src="search_counent.indexImg" :alt="search_counent.indexImg">
                    <p>{{search_counent.goodsName}}</p>
                    <p>￥{{search_counent.goodPrice+'0'}}</p>
                </a>
                <!-- <a href="javascript:;">
                    <img src="https://openfile.meizu.com/group1/M00/07/1C/Cgbj0Vyi-aOAT8yaAAW5mQNdc_c215.png@240x240.png" alt="">
                    <p>魅族Note9&emsp13;壳膜套装</p>
                    <p>￥199</p>
                </a> -->
            </div>
            <!-- 为你推荐公共的数据 -->
                <h3 v-show="this.isnullvalue">为你推荐</h3>
                <img v-show="this.isnullvalue" src="../../assets/mao/xhxls.png" alt="">
            <div v-show="this.isnullvalue"  class="recommend">
                    <a href="javascript:;" @click="toDatail(38)">
                    <img src="https://openfile.meizu.com/group1/M00/07/15/Cgbj0Fy9c0KAXyeaAAa7nrDVZiw073.png@240x240.png" alt="">
                    <p>魅族Note</p>
                    <p>￥199.00</p>
                </a>
                <a href="javascript:;"  @click="toDatail(19)">
                    <img src="https://openfile.meizu.com/group1/M00/07/28/Cgbj0Vy9Jq6AEzhMAApuih_4TPw329.png@240x240.png" alt="">
                    <p>魅族 POP2 真无线蓝牙耳机</p>
                    <p>￥399.00</p>
                </a>
                    <a href="javascript:;"  @click="toDatail(40)">
                    <img src="https://openfile.meizu.com/group1/M00/07/15/Cgbj0Fy9c0KAXyeaAAa7nrDVZiw073.png@240x240.png" alt="">
                    <p>魅族Note</p>
                    <p>￥199.00</p>
                </a>
                <a href="javascript:;"  @click="toDatail(19)">
                    <img src="https://openfile.meizu.com/group1/M00/07/28/Cgbj0Vy9Jq6AEzhMAApuih_4TPw329.png@240x240.png" alt="">
                    <p>魅族 POP2 真无线蓝牙耳机</p>
                    <p>￥399.00</p>
                </a>
            </div>
        </div>
    <!-- 自定义组件 -->
        <div v-show="this.component" class="coumponent">
            <p>大家都在搜</p>
            <div class="whereSearch">
                <a href="javascript:;" @click="toDetail(39)">魅族 pop2</a>
                <a href="javascript:;" @click="toDetail(35)">魅族 16x</a>
                <a href="javascript:;" @click="toDetail(43)">魅族 16xs</a>
            </div>
            <div class="history">
                <p>历史记录 <a href="javascript:;" @click="delete_history()">删除所有历史数据</a></p>
                <p v-for="(item,index) in history" @click="getVal" :key="index">{{item}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { constants } from 'crypto';
import myRequest from '../../commonFun';
export default {
    name:'SearchResult',
    data(){
        return{
            input:'',//顶部搜索框
            isnullvalue:false,//判断搜索为空时隐藏，有内容时显示
            show:'1',//添加active样式
            component:false,//input聚焦时显示盒子，当点击搜索时隐藏盒子
            history:[],//历史记录存储到localstorage
            search_counents:[]

        }
    },
    mounted () {
        //取storage里面的history
        let history=localStorage.getItem('history')
        if(history){
            this.history=JSON.parse(history)
        }
        //显示传入参数
        let value = this.$route.params.value;
        // 发起请求
        let url = `goodsInfo`;
        myRequest('post',url,{name:value,sortType:2},(res)=>{
            // console.log(res.data.goods)
            // 判断如果请求的结果长度小于1
            if(res.data.goods.length < 1){
                this.isnullvalue = true//显示空盒子
            }else{
                this.search_counents = res.data.goods;//把内容赋值给数组
            }
                this.input = value;//把客户搜索的内容返回给搜索框
                this.history.unshift(value)//把搜索的内容存进数组
                localStorage.setItem('history', JSON.stringify(this.history));//放进localstorage
                this.history = this.history.slice(0,10)//取搜索的十位数组
          })
    },
    methods:{
        toDetail(id){
            this.$router.push('/gooddetail/'+id)
        },
        //判断用户在此页面如果再次搜索空。那么显示暂无数据的盒子，反之亦然
        searchval(){
            let str = this.input.trim();//去两边空格
             let url = `goodsInfo`;
             myRequest('post',url,{name:str,sortType:2},(res)=>{
            if(res.data.goods.length < 1){
                this.isnullvalue = true//显示空盒子
            }else{
                this.isnullvalue = false;//显示有内容的盒子
                this.search_counents = res.data.goods;//把内容赋值给数组
            }
                let val = this.input;
                this.history.unshift(val)
                this.history = this.history.slice(0,10)//取搜索的十位数组
                localStorage.setItem('history', JSON.stringify(this.history));//存储到localstorage
                this.component = false;
            })

        },
        // 返回上一页事件
        search_return(){
            this.$router.go(-1)
        },
        // 聚焦时显示自定义
        focus(){
            this.component = true;//显示自定义组件
        },
        // 给排序价格筛选加上添加active样式
        toActive(v){
            this.show = v;
            // 点击，反转数组
                // this.search_counents = this.search_counents.reverse();
            if(v===1){
                let str = this.input.trim();//去两边空格
                let url = `goodsInfo`;
                 myRequest('post',url,{name:str,sortType:2},(res)=>{
                    this.search_counents = res.data.goods;//把内容赋值给数组
                 })
            }

            if(v===2){
                let str = this.input.trim();//去两边空格
                let url = `goodsInfo`;
                 myRequest('post',url,{name:str,sortType:3},(res)=>{
                    this.search_counents = res.data.goods;//把内容赋值给数组
                 })
            }
            if(v===3){
            let str = this.input.trim();//去两边空格
            let url = `goodsInfo`;
                myRequest('post',url,{name:str,sortType:1},(res)=>{
                this.search_counents = res.data.goods;//把内容赋值给数组
                })
            }
        },
        // 给排序价格筛选加上添加active样式
        isActive(index){
            if(index == this.show){
                return 'active'
            }else{
                return ''
            }
        },
        getVal(e){
            let innerText = e.target.innerText
            this.input = innerText
        },
        delete_history(){
            localStorage.removeItem('history');
             let history=localStorage.getItem('history')
            if(!history){
                this.history=[]
            }
        }
        
    },
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
  .searchResult{
      width: 100%;
      /* overflow: hidden; */
      position: relative;
  }
  .search{
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding: 5px;
    overflow: hidden;
    line-height: 40px;
    
  }
  .search p{
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: rgb(242,242,242);
    display: inline-block;
    position: relative;
  }
  .search .position{
      width: 20px;
      height: 20px;
      opacity: 0;
      z-index: 1000;
      position: absolute;
      left: 2px;
      top: 1px;
  }
  .search input{
    width: 260px;
    margin-left: 5px;
    border:none;
    outline: none;
    background: rgb(242,242,242)

  }
  .icon_return{
    font-size: 18px;
    padding:0 5px;
  }
  .icon_search{
    font-size: 14px;
    border: none;
  }
  .btn_search{
    font-size: 14px;
    color: #4d91ed;
    margin-left: 10px;
  }
  /* main */
  .main{
    width: 100%;
    background: rgb(243,243,243);
    /* height: 600px; */
    text-align: center;
  }
  .main h3{
      width: 100%;
      line-height: 40px;
      text-align: center;
  }
  .main img {
      height: 2px;
  }
  /* 排序 */
    .sortWrap{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 10px;
    background: #fff;
    margin-bottom: 5px;
       
    }
    .sortWrap a{
    width: 33%;
    line-height: 30px;;
    text-align: center;
    }
    /* 有内容，推荐商品的样式 */
    .content,.recommend{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }
    .content a,.recommend a{
        width: 49%;
        height: 170px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        margin: 1px;
        background-color: #fff;
        overflow: hidden;
    }
    .content img,.recommend img{
        width: 100px;
        height: 100px;
        text-align: center;
    }
    .content>a>p,.recommend>a>p{
        margin: 5px 0;
    }
    .content>a>p:nth-of-type(2),.recommend>a>p:nth-of-type(2){
        color: red;
    }
    /* 没有商品的数据 */
    .content_empty{
        width: 100%;
        height: 150px;
        background: url(../../assets/mao/search/search_01.png)no-repeat center;
        position: relative;
    }
    .content_empty img{
        width: 100px;
        height: 100px;
    }
    .content_empty p {
        position: absolute;
        top: 140px;
        left: 35%;
    }
    .active{
        color: #409eff;
    }
    /* 自定义 */
    .coumponent{
    width: 100%;
    height: 600px;
    position: absolute;
    top: 50px;
    left: 0;
    background: rgb(243,243,243);
    z-index: 100;
    border-top: 1px solid #e2e2e2;
    }
    .coumponent>p{
        line-height: 40px;
        padding: 10px;
        font-size: 14px;
        background-color: #fff;
    }
    .whereSearch{
        width: 100%;
        min-height: 100px;
        padding: 10px;
        display: flex;
        background-color: #fff;
        margin-bottom: 10px;
    }
    .whereSearch a{
        width: 30%;
        height: 30px;
        border-radius: 10px;
        border: 1px solid #ccc;
        display: flex;
        padding: 5px;
        justify-content: space-around;
        margin: 0 5px;
    }
    .history{
        width: 100%;
        background-color: #fff;

    }
    .history p:nth-of-type(1){
         border:none;
         display: flex;
         justify-content: space-between;
    }
    .history p{
        width: 100%;
        padding: 10px;
        border-bottom: 1px  dotted #ccc;
    }
    .history>p>a{
        color:#4d91ed;
    }
</style>