<template>
  <div class="firtPage">
    <!-- 轮播图 -->
    <header>
      <div class="banner swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="../../assets/mao/swiper/swiper_01.jpg" />
          </div>
          <div class="swiper-slide">
            <img src="../../assets/mao/swiper/swiper_02.jpg" />
          </div>
          <div class="swiper-slide">
            <img src="../../assets/mao/swiper/swiper_03.jpg" />
          </div>
          <div class="swiper-slide">
            <img src="../../assets/mao/swiper/swiper_04.jpg" />
          </div>
          <div class="swiper-slide">
            <img src="../../assets/mao/swiper/swiper_05.jpg" />
          </div>
          <div class="swiper-slide">
            <img src="../../assets/mao/swiper/swiper_06.jpg" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <!-- 搜索 -->
      <div class="search" ref="searchClass">
        <img src="../../assets/mao/logo.png" alt />
        <div class="input_search">
          <span class="el-icon-search" @click="searchProduct()"></span>
          <input v-model="input" type="text" />
          <span @click="toShoppingCart()" class="el-icon-shopping-cart-2 icon_02"></span>
        </div>
      </div>
    </header>
    <!-- 魅族官方直供应 -->
    <div class="main">
      <div class="supply">
        <a href="javascript:;">
          <span class="el-icon-info icon1"></span>
          <span>魅族官方直供</span>
        </a>
        <a href="javascript:;">
          <span class="el-icon-s-help icon1"></span>
          <span>满80免运费</span>
        </a>
        <a href="javascript:;">
          <span class="el-icon-star-on icon1"></span>
          <span>7天无理由退货</span>
        </a>
      </div>
      <!-- 福利签到区域 -->
      <div class="nav">
        <a href="javascript:;" @click="toAdvice">
          <img src="../../assets/mao/pic_1.png" alt />
          <span>签到会员</span>
        </a>
        <a href="javascript:;" @click="toAdvice">
          <img src="../../assets/mao/pic_2.png" alt />
          <span>会员领劵</span>
        </a>
        <a href="javascript:;" @click="toAdvice">
          <img src="../../assets/mao/pic_3.png" alt />
          <span>以旧换新</span>
        </a>
        <a href="javascript:;" @click="toAdvice">
          <img src="../../assets/mao/pic_4.png" alt />
          <span>限时抢购</span>
        </a>

        <a href="javascript:;" @click="toAdvice">
          <img src="../../assets/mao/pic_5.png" alt />
          <span>热销手机</span>
        </a>
        <a href="javascript:;" @click="toAdvice">
          <img src="../../assets/mao/pic_6.png" alt />
          <span>配件声学</span>
        </a>
        <a href="javascript:;" @click="toAdvice">
          <img src="../../assets/mao/pic_7.png" alt />
          <span>数码科技</span>
        </a>
        <a href="javascript:;" @click="toAdvice">
          <img src="../../assets/mao/pic_8.png" alt />
          <span>新品推荐</span>
        </a>
      </div>
      <!-- cellphoneImg新手机图片展示区 -->
      <div class="cellphoneImg">
        <a href="javascript:;" @click="toDetail(40)">
          <img src="../../assets/mao/heng/heng_01.png" alt />
        </a>
        <a href="javascript:;" @click="toDetail(40)">
          <img src="../../assets/mao/heng/heng_02.png" alt />
        </a>
        <a href="javascript:;" @click="toDetail(40)">
          <img src="../../assets/mao/heng/heng_03.png" alt />
        </a>
      </div>
      <!--  热销手机-->
      <div class="sellWell">
        <h2 class="phone_height">热销手机</h2>
        <img src="../../assets/mao/xhxls.png" alt />
        <div class="cellphone">
          <a
            href="javascript:;"
            @click="toDetail(phone.goodsID)"
            v-for="phone in phones"
            :key="phone.goodsID"
          >
            <img class="loading_img" :src="phone.indexImg" alt />
            <h3>{{phone.goodsName}}</h3>
            <span>{{ phone.introduc.substring(1,5) + '...'}}</span>
            <b>￥{{phone.goodPrice+'0'}}</b>
          </a>
          <!-- <a href="javascript:;" @click="toDetail()">
                <img src="https://openfile.meizu.com/group1/M00/07/36/Cgbj0VzC2w6ASUtDAAMvobH66uY340.jpg" alt="">
                <h3>魅族16&emsp;16s</h3>
                <span>晓龙885&emsp13;4800w光学防抖</span>
                <b>￥2699</b>
          </a>-->
        </div>
      </div>
      <!-- 魅族声学 -->
      <div class="superSoundWrap">
        <h2 class="sound_Height">魅族声学</h2>
        <img src="../../assets/mao/xhxhs.png" alt />
        <div class="superSound">
          <a href="javascript:;" @click="toDetail(31)"></a>
          <a href="javascript:;" @click="toDetail(31)">
            <h4>魅族 EP2C 耳机</h4>
            <p>钕铁硼单元 Type-C接口</p>
            <img class="xhxls" src="../../assets/mao/xhxls.png" alt />
            <p>￥129.00</p>
          </a>
          <a href="javascript:;" @click="toDetail(31)">
            <h4>魅族 POP2 真无线蓝牙耳机</h4>
            <p>蓝牙5.0 超长续航</p>
            <img class="xhxls" src="../../assets/mao/xhxls.png" alt />
            <p>￥399.00</p>
          </a>
          <a href="javascript:;" @click="toDetail(31)"></a>
        </div>
        <!-- 展示声学商品 -->
        <div class="showSound">
          <a
            href="javascript:;"
            @click="toDetail(sound.goodsID)"
            v-for="sound in sounds"
            :key="sound.goodsID"
          >
            <img :src="sound.indexImg" alt />
            <p>{{sound.goodsName}}</p>
            <span>
              <em>热卖</em>
              {{ sound.introduc }}
            </span>
            <span>￥{{sound.goodPrice+'0'}}</span>
          </a>
          <!-- <a href="javascript:;" @click="toDetail()">
                <img src="https://openfile.meizu.com/group1/M00/01/D2/Cgbj0Fmb55mABV4HAAKspJD9ivQ842.png" alt="">
                <p>魅族 HIFI 解码耳放</p>
                <span><em>热卖</em>智能降噪 声临其境</span>
                <span>￥499</span>
          </a>-->
        </div>
      </div>
      <!-- 智能配件 -->
      <div class="partsWrap">
        <h2 class="part">智能配件</h2>
        <img src="../../assets/mao/xhxhs.png" alt />
        <div class="partProduct">
          <a href="javascript:;" @click="toDetail(42)"></a>
          <a href="javascript:;" @click="toDetail(42)">
            <h4>魅族移动电源3</h4>
            <p>双向快充双充电口 轻薄小巧</p>
            <img class="xhxls" src="../../assets/mao/xhxls.png" alt />
            <p>￥79.00</p>
          </a>
          <a href="javascript:;" @click="toDetail(42)">
            <h4>魅族无线充电器</h4>
            <p>10W快速充电 无线即放即充</p>
            <img class="xhxls" src="../../assets/mao/xhxls.png" alt />
            <p>￥99.00</p>
          </a>
          <a href="javascript:;" @click="toDetail(42)"></a>
        </div>
        <!-- 智能配件商品展示 -->
        <div class="partShow">
          <a
            href="javascript:;"
            @click="toDetail(part.goodsID)"
            v-for="part in parts"
            :key="part.goodsID"
          >
            <img :src="part.indexImg" alt />
            <p>{{part.goodsName}}</p>
            <span>
              <em>热卖</em>
              {{ part.introduc }}
            </span>
            <span>￥{{part.goodPrice+'0'}}</span>
          </a>
          <!-- <a href="javascript:;" @click="toDetail()">
                <img src="https://openfile.meizu.com/group1/M00/01/D2/Cgbj0Fmb55mABV4HAAKspJD9ivQ842.png" alt="">
                <p>魅族 HIFI 解码耳放</p>
                <span><em>热卖</em>智能降噪 声临其境</span>
                <span>￥499</span>
          </a>-->
        </div>
      </div>
      <!-- 生活周边 -->
      <div class="ambitusWrap">
        <h2 class="ambitus">生活周边</h2>
        <img src="../../assets/mao/xhxhs.png" alt />
        <div class="ambitusProduct">
          <a href="javascript:;" @click="toDetail(28)"></a>
          <a href="javascript:;" @click="toDetail(28)">
            <h4>魅族星球探索 鼠标垫</h4>
            <p>FOR THE LOVELY ONES</p>
            <img class="xhxls" src="../../assets/mao/xhxls.png" alt />
            <p>￥69.00</p>
          </a>
          <a href="javascript:;" @click="toDetail(28)">
            <h4>魅族星球探索&emsp;帆布袋</h4>
            <p>FOR THE LOVELY ONES</p>
            <img class="xhxls" src="../../assets/mao/xhxls.png" alt />
            <p>￥69.00</p>
          </a>
          <a href="javascript:;" @click="toDetail(28)"></a>
        </div>
        <!-- 生活周边展示区 -->
        <div class="abmitusShow">
          <a
            href="javascript:;"
            @click="toDetail(ambitu.goodsID)"
            v-for="ambitu in ambitus"
            :key="ambitu.goodsID"
          >
            <img :src="ambitu.indexImg" alt />
            <p>{{ambitu.goodsName}}</p>
            <span>
              <em>热卖</em>
              {{ ambitu.introduc}}
            </span>
            <span>￥{{ambitu.goodPrice+'0'}}</span>
          </a>
          <!-- <a href="javascript:;" @click="toDetail()">
                <img src="https://openfile.meizu.com/group1/M00/01/0B/CnQOjViW3XCAKiurAAJdQmZyd6M936.png" alt="">
                <p>魅族 HIFI 解码耳放</p>
                <span><em>热卖</em>智能降噪 声临其境</span>
                <span>￥499</span>
          </a>-->
        </div>
      </div>
    </div>
    <CheckResult :result="checkResult" @closeThis="close" v-if="isShow" />
  </div>
</template>
<script>
import myRequest from "../../commonFun";
import CheckResult from "../../components/checkResult";
import "swiper/dist/css/swiper.css"; //导入轮播图样式
import Swiper from "swiper"; //导入轮播图样式
import { setTimeout } from "timers";
export default {
  name: "FirstPage",
  data() {
    return {
      input: "", //首页轮播图的搜索
      input1: "",
      phones: [], //手机的数据
      sounds: [],
      parts: [],
      ambitus: [],
      isShow: false,
      checkResult: "",
      area: {
        A_area: false,
        B_area: false,
        C_area: false,
        D_area: false
      }
    };
  },
  components: {
    CheckResult
  },
  methods: {
    toAdvice() {
      this.isShow = true;
      this.checkResult = "暂未开通，敬请期待";
    },
    close(val) {
      this.isShow = val;
    },
    //搜索跳转分类页
    searchProduct() {
      // console.log(input)
      let str = this.input.trim();
      //   let url = `goodsInfo`;
      //   myRequest('post',url,{name:str,sortType:1},(res)=>{
      //   console.log(res.data.goods)
      // })
      // console.log(str)
      if (str != "") {
        // 搜索内容length<1那么内容为空。显示empty
        this.$router.push("/searchresult/" + str);
      }
    },
    //跳转商品详情
    toDetail(goodsID) {
      // console.log(goodsID)
      this.$router.push("/gooddetail/" + goodsID);
    },
    toShoppingCart() {
      this.$router.push("/shoppingcar");
    },
    handleScroll() {
      // let  that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; // 滚动条偏移量
      let windowScrollTop = window.innerHeight; //获取当前屏幕的高度
      let loading_img = document.querySelectorAll(".loading_img"); //获取需要懒加载图片的class
      let phone_height = document.querySelector(".phone_height"); //获取A块手机区域属性
      let phoneHeight = phone_height.offsetTop; //获取第一次需要懒加载的手机区域快高度
      // 判断A区手机端快要低达可视区，发起一次请求
      if (phoneHeight <= scrollTop + windowScrollTop) {
        if (this.area.A_area === false) {
          //为false才请求
          console.log("加载area.A_area");
          let timeOut = setTimeout(() => {
            //防抖
            const url = `goodsInfo`;
            this.getData(url, "手机", 1, "phones");
            timeOut = null; //清空计时器
          }, 500);
          this.area.A_area = true; //请求成功把状态改为true
        }
      }
      //搜索框吸顶
      if (scrollTop > 40) {
        this.$refs.searchClass.className = "search fixedSearch";
      } else {
        this.$refs.searchClass.className = "search";
      }

      // 获取B块声学区域属性
      let sound_Height = document.querySelector(".sound_Height");
      let soundHeight = sound_Height.offsetTop; //获取B声学块懒加载的声学区域快高度
      if (soundHeight <= scrollTop + windowScrollTop) {
        if (this.area.B_area === false) {
          //为false才请求
          console.log("加载area.B_area");
          let timeOut = setTimeout(() => {
            //防抖
            const url = `goodsInfo`;
            this.getData(url, "声学", 1, "sounds");
            timeOut = null; //清空计时器
          }, 500);
          this.area.B_area = true; //请求成功把状态改为true
        }
      }
      // 获取C块配件区域属性
      let part_Height = document.querySelector(".part");
      let partHeight = part_Height.offsetTop; //获取B声学块懒加载的声学区域快高度
      if (partHeight <= scrollTop + windowScrollTop) {
        if (this.area.C_area === false) {
          //为false才请求
          console.log("加载area.C_area");
          let timeOut = setTimeout(() => {
            //防抖
            const url = `goodsInfo`;
            this.getData(url, "配件", 1, "parts");
            timeOut = null; //清空计时器
          }, 500);
          this.area.C_area = true; //请求成功把状态改为true
        }
      }
      // 获取D块生活区域属性
      let ambitus_Height = document.querySelector(".ambitus");
      let ambitusHeight = ambitus_Height.offsetTop; //获取B声学块懒加载的声学区域快高度
      if (ambitusHeight <= scrollTop + windowScrollTop) {
        if (this.area.D_area === false) {
          //为false才请求
          console.log("加载area.D_area");
          let timeOut = setTimeout(() => {
            //防抖
            const url = `goodsInfo`;
            this.getData(url, "生活", 1, "ambitus");
            timeOut = null; //清空计时器
          }, 500);
          this.area.D_area = true; //请求成功把状态改为true
        }
      }

      // for (let i = 0; i<loading_img.length;i++){
      //     let img_titleTop = loading_img[i].offsetTop;//获取每一张图片的高度
      //     if(img_titleTop < scrollTop + windowScrollTop){//如果图片的高度小于滚动条加上屏幕高度
      //        setTimeout(()=>{//延时器测试效果
      //         let data_src = loading_img[i].getAttribute('datasrc') //获取datasrc
      //         loading_img[i].setAttribute('src',data_src)//把SRC替换成datasrc
      //        },1000)
      //     }
      // }
    },
    getData(url, val, sort, classify) {
      //手机的请求
      return myRequest("post", url, { goodsType: val, sortType: sort }, res => {
        this[classify] = res.data.goods;
      });
    }
  },
  mounted() {
    // axios.post(url,'goodsType=手机&sortType=1').then((result)=>{
    //   console.log(result.data.goods)//获取到的数据
    //   this.phones = result.data.goods
    //   this.phones.introduc = result.data.goods.introduc
    // }).catch((err)=>{
    //   console.log(err)
    // })
    window.addEventListener("scroll", this.handleScroll); //添加懒加载
    // 轮播图swiper
    const mySwiper = new Swiper(".swiper-container", {
      loop: true,
      autoplay: {
        delay: 2500 //1秒切换一次
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      //用户操作后, autoplay会默认停止, 这个是取消禁止autoplay
      autoplayDisableOnInteraction: false
    });
  }, //计算属性
  computed: {},
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll); //删除懒加载
  }
  //    beforeDestroy:{
  //   window.addEventListener('scroll', this.handleScroll)//删除懒加载
  //  }
};
</script>

<style  scoped>
* {
  padding: 0;
  margin: 0;
  font-size: 12px;
  box-sizing: border-box;
}
a {
  color: #000;
}
img {
  vertical-align: top;
}

ul li {
  padding: 20px;
  background: palegreen;
  margin-bottom: 10px;
  margin-top: 10px;
}
.banner {
  position: relative;
}
.swiper-slide > img {
  width: 100%;
  height: 190px;
}
/* 搜索 */
.search {
  width: 100%;
  height: 40px;
  padding: 0 10px;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 99;
}
.fixedSearch {
  position: fixed;
  background: #fff;
}
.search img {
  width: 65px;
  height: 10px;
  margin-top: 15px;
}
.input_search {
  display: inline-block;
  width: 260px;
  height: 30px;
  margin-left: 10px;
  margin-top: 8px;
}
.input_search input {
  width: 220px;
  height: 25px;
  background: none;
  outline: none;
  border: none;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid #ccc;
  color: #ccc;
}
.el-icon-search {
  font-size: 16px;
  margin-top: 5px;
  margin-right: 8px;
  color: #ccc;
}
.search .input_search span:nth-of-type(2) {
  display: inline-block;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px;
  text-align: center;
  position: absolute;
  right: 15px;
  top: 10px;
}
.icon_02 {
  font-size: 20px;
  color: #ccc;
}
/*魅族官方直供应  */
.main {
  background-color: #f4f4f4;
}
.supply {
  width: 100%;
  height: 36px;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  background-color: #f4f4f4;
}
.supply span {
  color: #999;
}
.icon1 {
  margin-right: 5px;
}
.nav {
  width: 100%;
  bottom: 1px solid #000;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px;
  background-color: #fff;
}
.nav a {
  width: 25%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
}
.nav a img {
  width: 30px;
  height: 30px;
  text-align: center;
  margin: 10px auto;
}
/*cellphoneImg新手机图片展示区  */
.cellphoneImg {
  width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
}
.cellphoneImg a {
  width: 100%;
  margin: 10px 0;
}
.cellphoneImg a:nth-of-type(1) {
  display: block;
}
.cellphoneImg a:nth-of-type(1) img {
  width: 50%;
  height: 260px;
  float: left;
}
.cellphoneImg a img {
  width: 50%;
  height: 130px;
  float: left;
}
/* 热销手机，魅族声学，智能配件，生活周边 */
/* 共用头部样式 */
.sellWell,
.superSoundWrap,
.partsWrap,
.ambitusWrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 10px 0;
}
.sellWell h2,
.superSoundWrap h2,
.partsWrap h2,
.ambitusWrap h2 {
  line-height: 30px;
  text-align: center;
}
.sellWell > img,
.superSoundWrap > img,
.partsWrap > img,
.ambitusWrap > img {
  width: 10px;
  height: 2px;
  margin: 5px auto;
}
.cellphone {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.cellphone a {
  width: 49%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  margin: 1px;
  padding: 10px;
}
.cellphone img {
  width: 168px;
  height: 156px;
}
.cellphone > a > h3 {
  margin: 3px 0;
}
.cellphone a > b {
  color: red;
}
.cellphone a > span {
  color: #999;
  margin: 4px 0;
}
/* 魅族声学，智能配件,生活周边 */
.superSound,
.partProduct,
.ambitusProduct {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
}
.superSound a,
.partProduct a,
.ambitusProduct a {
  display: flex;
  width: 50%;
  height: 166px;
  flex-direction: column;
  color: #fff;
  padding-left: 10px;
  justify-content: center;
}
.superSound a p,
.partProduct a p,
.ambitusProduct a p {
  margin: 10px 0;
}
.superSound a:nth-of-type(1) {
  background: url(../../assets/mao/sound/sound_01.jpg);
  background-size: contain;
}
.superSound a:nth-of-type(2) {
  background-color: #7063c9;
}
.superSound a:nth-of-type(3) {
  background-color: rgb(245, 92, 92);
}
.superSound a:nth-of-type(4) {
  background: url(../../assets/mao/sound/sound_02.jpg);
  background-size: contain;
}
.superSound a p:nth-of-type(1) {
  color: hsla(0, 0%, 100%, 0.7);
}
.xhxls {
  width: 20px;
  margin: 10px 0;
  color: #fff;
}
/* 声学商品展示 ，智能配件展示*/
.showSound,
.partShow,
.abmitusShow {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.showSound a,
.partShow a,
.abmitusShow a {
  width: 49%;
  height: 260px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
  color: #c00;
  margin: 1px;
  background-color: #fff;
  box-sizing: border-box;
}
.showSound a img,
.partShow a img,
.abmitusShow a img {
  width: 156px;
  height: 156px;
}
.showSound a span,
.partShow a span,
.abmitusShow a span {
  margin: 5px 0;
}
.showSound a p,
.partShow a p,
.abmitusShow a p {
  color: #333;
  font-weight: 700;
  width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
.showSound a span em,
.partShow a span em,
.abmitusShow a span em {
  display: inline-block;
  background-color: #c00;
  font-style: normal;
  color: #fff;
  width: 30px;
  height: 20px;
  margin-right: 10px;
  text-align: center;
}
.showSound a span:nth-of-type(1),
.partShow a span:nth-of-type(1),
.abmitusShow a span:nth-of-type(1) {
  border: 1px solid #c00;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
/* 智能配件背景图片区 */

.partProduct a:nth-of-type(1) {
  background: url(../../assets/mao/part/part_01.jpg);
  background-size: contain;
}
.partProduct a:nth-of-type(2) {
  background-color: rgb(85, 195, 195);
}
.partProduct a:nth-of-type(3) {
  background-color: rgb(255, 174, 69);
}
.partProduct a:nth-of-type(4) {
  background: url(../../assets/mao/part/part_02.jpg);
  background-size: contain;
}
.partProduct a p:nth-of-type(1) {
  color: hsla(0, 0%, 100%, 0.7);
}
/* 生活周边背景图片区 */
.ambitusProduct a:nth-of-type(1) {
  background: url(../../assets/mao/ambitus/ambitus_01.jpg);
  background-size: contain;
}
.ambitusProduct a:nth-of-type(2) {
  background-color: rgb(245, 92, 92);
}
.ambitusProduct a:nth-of-type(3) {
  background-color: rgb(112, 99, 201);
}
.ambitusProduct a:nth-of-type(4) {
  background: url(../../assets/mao/ambitus/ambitus_02.jpg);
  background-size: contain;
}
.ambitusProduct a p:nth-of-type(1) {
  color: hsla(0, 0%, 100%, 0.7);
}
</style>
