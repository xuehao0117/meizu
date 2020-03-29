<template>
  <div class="chart">
    <div class="chartCon">
        <p><i class="el-icon-arrow-left" @click="goBack"></i></p>
        <ul>
            <li>
                <p>{{nowTime}}</p>
                 <p><img src="../../assets/ddProfile/chart.png" alt=""></p>
                 <p>
                    <i class="el-icon-loading"></i> 魅族苏宁 818狂欢购 ! <br/> 
                    <i class="el-icon-loading"></i> 多重豪礼等你来拿——<a href="javascript:;">「快来戳我呀」</a>
                 </p>
            </li>
            <li v-for="(history,index) in chartHistory" :key="index" :class="isMeizu(history.from)">
                <p>{{history.time}}</p>
                <p><img :src="imgSrc(history.from)" alt=""></p>
                <p>
                    {{history.content}}
                </p>
            </li>
        </ul>
    </div>
    <div class="sendMsg">
      <input type="text" placeholder="请输入问题" v-model="sendMsg"/>
      <i class="el-icon-s-promotion" @click="send"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "Chart",
  data () {
      return {
          chartHistory:[
            //   {
            //       from:'user',content:'你好',time:'18:50'
            //   },
        ],
        nowTime:new Date().getHours()+":"+new Date().getMinutes(),
        sendMsg:""
      }
  },
  methods:{
      imgSrc(key){
          console.log(key)
          if(key==='meizu'){
              return require('../../assets/ddProfile/chart.png')
          }else{
               return require('../../assets/zhang/user2.png')
          }
      },
      isMeizu(key){
          if(key!=='meizu'){
              return 'right'
          }else{
              return ''
          }
      },
      send(){
          let msg=this.sendMsg
          let hour=(new Date()).getHours()>=10?new Date().getHours():'0'+new Date().getHours()
          let minute=new Date().getMinutes()>=10?new Date().getMinutes():'0'+new Date().getMinutes()
          let time=hour+':'+minute
          let obj={
              content:msg,
              time:time
          }
          this.chartHistory.push(obj)
          this.sendMsg=''
      },
      goBack(){
          this.$router.go(-1)
      }
  }
};
</script>
<style scoped>
.chart {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f2f2f2;
  height: 100%;
}
.chartCon{
    width: 90%;
    padding: 5%
}
.chartCon{
    overflow: hidden;
}
.chartCon ul>li{
    margin-bottom: 10px;
}
.chartCon ul>.right>p:nth-child(2){
    float: right;
}

.chartCon ul>li>p:nth-child(1){
    text-align: center;
     clear: both;
}
.chartCon ul>li>p:nth-child(3){
    overflow: hidden;
    line-height: 35px;
    background: #fff;
    padding: 10px;
    margin-top: 15px;
    border-radius: 10px;
    
}
.chartCon ul>.right>p:nth-child(3){
    float: right;
    margin-right: 10px;

}
.chartCon ul>li>p:nth-child(2){
    float: left;
    clear: both;
    margin-top: 10px;

}
.chartCon ul>li>p>img{
    width: 35px;
    background: #e2e2e2;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 10px;
}
.sendMsg {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 20px;
  background: #fff;
  border-top: 1px solid #e2e2e2;
}
.sendMsg > input {
  width: 75%;
  height: 35px;
  border-radius: 10px;
  border: 1px solid #e2e2e2;
  outline: none;
  margin-right: 10px;
  background: #f2f2f2;
  vertical-align: middle;
   margin-left: 10px;
  text-indent: 10px;
}
::-webkit-input-placeholder{
    color: #999;
}
.sendMsg > i{
    font-size: 28px;
    color: #999;
    vertical-align: middle;
}
.el-icon-loading{
    color: rgb(128, 0, 0);
}
a{
    color: rgb(51, 102, 255);
}
.el-icon-arrow-left{
    font-size: 26px;
    padding: 5px;
}
</style>