import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from "@/api";
import {setToken,getToken,removeToken} from '@/utils/token';
//  登录与注册模块
const state = {
    code:"",
    token:getToken(),
    userInfo:{}
};
const mutations = {
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token = token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    CLEAR(state){
        state.token = '';
        state.userInfo={};
        removeToken();
    }
};
const actions = {
    // 获取验证码
    async getCode({commit},phone){
        // 获取验证码接口，将验证码返回（正常情况下后台是将验证码发到用户手机上）
        let result = await reqGetCode(phone);
        if(result.code==200){
            commit("GETCODE",result.data);
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 登录【token】
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        // 服务器下发token，用户唯一标识符
        if(result.code==200){
            // 用户已经登录成功并获取到token
            commit("USERLOGIN",result.data.token);
            // 持久化存储token
            setToken(result.data.token);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        if(result.code==200){
            commit("GETUSERINFO",result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
        
    },
    // 退出登录
    async userLogout({commit}){
        // 向服务器发请求,通知服务器清除token
        let result = await reqLogout();
        // 提交mutation修改state中的前端数据
        if(result.code==200){
            commit("CLEAR");
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }

    }
};
const getters = {};
export default{
    state,
    mutations,
    actions,
    getters
}