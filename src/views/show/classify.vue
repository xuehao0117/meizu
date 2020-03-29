<template>
    <div class="classify">
      <header>
        <ul>
          <li @click="toThisPage('phone')" :class="isActive('phone')">
            <img src="../../assets/mao/classify/classify_01.png" alt="">
            手机
          </li>
          <li @click="toThisPage('voice')" :class="isActive('voice')">
            <img class="shengxue" src="../../assets/mao/classify/classify_02.png" alt="">
            声学
          </li >
          <li @click="toThisPage('parts')" :class="isActive('parts')">
            <img src="../../assets/mao/classify/classify_03.png" alt="">
            配件
          </li>
          <li @click="toThisPage('life')" :class="isActive('life')">
            <img src="../../assets/mao/classify/classify_04.png" alt="">
           生活
          </li>
        </ul>
        <router-view></router-view>
      </header>
      <!-- <section>
        
      </section> -->
    </div>
</template>
<script>


export default {
  name: 'Classify',
  data(){
    return{
      urlVal:'phone'
    }
  },
  components: {
    
  },
  methods:{
    toThisPage(page){
      //跳转路由
      this.urlVal = page;
      this.$router.push('/main/classify/'+page)
    },
    isActive(val){
      if(val === this.urlVal){
        return 'active'
      }else{
        return ''
      }
    }
  },
  mounted(){
     let item = this.$route.path;//获取当前页面的路径地址
      console.log(item.split('/').pop());//取路径地址最后一个元素
      this.urlVal = item.split('/').pop();//把元素赋值给 this.thisPageName
  }
}
</script>

<style  scoped>
*{
  box-sizing: border-box;
  font-size: 14px;
}
ul {
  width: 15%;
  min-height: 650px;
  border-right: 1px solid #e2e2e2;
  float: left;
}
ul li{
  display: flex;
  flex-direction: column;
  justify-content:center;
  padding: 10px;
  align-items: center;

}
ul li img{
  margin: 10px auto;
  width: 20px;
}
.active{
  color:#409eff;
}
/* .shengxue{
  width: 30px;
} */
</style>