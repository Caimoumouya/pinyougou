import Vue from 'vue'
import App from './App.vue'
import {Button,MessageBox} from 'element-ui';
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
// 注册 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);
Vue.component(Button.name,Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store';
// 引入mockServer.js---mock数据
import '@/mock/mockServe';
// 引入swiper样式
import "swiper/css/swiper.css";

// 统一接受api文件夹里面全部请求函数
import * as API from '@/api';
import cxk from '@/assets/1.gif'
// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
// 注册
Vue.use(VueLazyload,{
    // 懒加载默认图片
    loading:cxk
});
// 引入表单校验插件
import "@/plugins/validate";


new Vue({
    render: h => h(App),
    // 全局事件总线$bus配置
    beforeCreate(){
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
    // 注册路由：底下的写法KV一致省略V
    // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
    router,
    // 注册仓库：组件实例的身上会多了一个属性$store属性
    store
}).$mount('#app')