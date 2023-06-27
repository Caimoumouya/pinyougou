// 引入
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
// 使用插件
Vue.use(VueRouter);
// 引入store
import store from '@/store';


// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功回调
// 第三个参数：失败回调
// call||apply区别
// 相同点，都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点：call与apply传递函数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => {}, () => {});
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => {}, () => {});
    }
}

// 配置路由
let router = new VueRouter({

    routes,
    // 路由切换滚动到最上方
    scrollBehavior(to,from,savedPosition){
        return {y:0};
    },
});

// 全局前置守卫
router.beforeEach(async (to,from,next)=>{
    // next放行函数 next()放行 next(path)放行到指定路由 next(false)
   let token = store.state.user.token;
   let name = store.state.user.userInfo.name;
//    用户已经登陆了
   if(token){
    // 用户已经登录不能去login
        if(to.path=='/login'){
            next('/home')
        }else{
            // 登录不是login页面
            // 如果用户名已有
            if(name){
                next();
            }else{
                // 刷新时空了派发action
                // 用户名没有,派发action让仓库存储用户信息再跳转
                try {
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // token失效了，获取不到用户信息，重新登录
                    // 清除token
                    await store.dispatch('userLogout');
                    next('/login');
                }

            }
        }
    
   }else{
        // 用户未登录
        let toPath = to.path;
        // toPath里包含trade或pay或center
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            // 把未登录想去而没有去的地方存储在地址栏中
            next('/login?redirect='+toPath);
        }else{
            next();
        }
   }
})

export default router;