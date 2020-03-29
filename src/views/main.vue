<template>
    <div class="wrap">
       <section>
           <router-view></router-view>
       </section>
       <footer>
           <ul class="footerNav">
               <li @click="toThisPage('firstpage')" :class="isWhatPage('firstpage')">
                   <i class="el-icon-s-home icon_01"></i>
                   首页
                </li>
               <li @click="toThisPage('classify')" :class="isWhatPage('phone')">
                   <i class="el-icon-menu icon_01"></i>
                   分类
                </li>
                <li>
                   <img class="firsterImg" src="../assets/mao/firsterpage/firsterpage_01.png" alt="">
                </li>
                <li @click="toThisPage('shoppingcar')" :class="isWhatPage('shoppingcar')">
                    <i class="el-icon-shopping-cart-2 icon_02"></i>
                    购物车
                </li>
               <li @click="toThisPage('selfcenter')" :class="isWhatPage('selfcenter')">
                   <i class="el-icon-s-custom icon_01"></i>                   
                   我的
                </li>
                
           </ul>
       </footer> 
    </div>
</template>

<script>
export default {
    name:'Main',
    data(){
        return{
            thisPageName:'firstpage'
        }
    },
    methods:{
        //底部导航路由跳转
        toThisPage(page){
            if(page==='shoppingcar'){
                 this.$router.push("/"+page)
                 return
            }
            if(page==='classify'){
                this.$router.push("/main/"+page)
                this.thisPageName = 'phone'
                return
            }
            this.thisPageName=page;
            this.$router.push('/main/'+ page)
        },
        // 绑定方法获取点击底部导航要去的路径，当路径等于value时，设置class名：active
        isWhatPage(value){
            if(value === this.thisPageName){
                return 'active'
            }else{
                ''
            }

        }
    },
    mounted(){
        // console.log(this.$route.path.splice('/'))
        let item = this.$route.path;//获取当前页面的路径地址
        //console.log(item.split('/').pop());//取路径地址最后一个元素
        this.thisPageName = item.split('/').pop();//把元素赋值给 this.thisPageName
    }
}
</script>

<style  scoped>
.wrap{
    width: 100%;

}
footer{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
}
.footerNav{
    width: 100%;
    display: flex;
    text-align: center;
    border-top: 1px solid #e2e2ee;
    justify-content: space-around;
    background-color: #fff;
    color: #999;
    
}   
.footerNav>li{
    padding: 5px 0;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    position: relative;


}
.icon_01{
    font-size: 24px;
}
.icon_02{
    font-size: 26px;
}
.active{
    color: #409eff;
}
.footerNav li img{
    width: 55px;
    position: absolute;
    top: -15px;
    left: -26px;
}

</style>