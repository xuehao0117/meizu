import Vue from 'vue';
//引入vue-router模块
import vueRouter from 'vue-router';

//告诉Vue使用vue-router模块
Vue.use(vueRouter);

//导入路由组件
import Main from './views/main';
//底部导航→推荐页
import FirstPage from './views/show/firtPage';
    //商品详情
    import GoodDetail from './views/goodsDetail/main'
    //客服页
    import Chart from './views/goodsDetail/chartWith'
//底部导航→分类页
import Classify from './views/show/classify'

    //分类页路由
    import Phone from './views/show/phone';
    import Voice from './views/show/voice';
    import Parts from './views/show/parts';
    import Life from './views/show/life';

//底部导航→我的
import SelfCenter from './views/show/selfCenter';
    //订单
    import Orders from './views/self/orders';
    import Address from './views/self/address';
    import Collect from './views/self/collect';

//搜索结果页
import SearchResult from './views/show/searchResult';

//购物车
import Shoppingcar from './views/self/shoppingcar';
//结算页
import PayFor from './views/self/payfor';

import Comment from './views/self/comment';

//登录
import Login from './views/log-reg/login';
//注册
import Registe from './views/log-reg/registe';

const router = new vueRouter({
    //页面切换自动到达顶部
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        //重定向，首页默认显示推荐页
        { path: '/', redirect: '/main' },
        {
            path: '/main', component: Main,
            children: [
                //重定向，首页默认显示推荐页
                { path: '/main', redirect: '/main/firstpage' },
                { path: 'firstpage', component: FirstPage },
                {
                    path: 'classify', component: Classify,
                    children: [
                         //重定向，分类页默认显示手机
                        { path: '/main/classify', redirect: '/main/classify/phone' },
                        { path: 'phone' ,component:Phone},
                        { path: 'voice' ,component:Voice},
                        { path: 'parts' ,component:Parts},
                        { path: 'life' ,component:Life},
                    ]
                },
                { path: 'selfcenter', component: SelfCenter },
            ]
        },
        {
            path: '/searchresult/:value', component: SearchResult
        },
        {   
            path:'/gooddetail/:id',component:GoodDetail
        },
        {   
            path:'/shoppingcar',component:Shoppingcar
        },
        {   
            path:'/payfor',component:PayFor
        },
        {   
            path:'/orders',component:Orders
        },
        {   
            path:'/address',component:Address
        },
        {   
            path:'/collect',component:Collect
        },
        {   
            path:'/login',component:Login
        },
        {   
            path:'/registe',component:Registe
        },
        {   
            path:'/chart',component:Chart
        },
        {   
            path:'/comment',component:Comment
        },
    ]
})

export default router;