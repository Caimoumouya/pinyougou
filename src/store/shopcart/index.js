import {reqCartList,reqDeleteCartById,reqUpdateCheckedByid} from "@/api";
const state = {
    cartList:[],
};
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList;
    }
};
const actions = {
    async getCartList({commit}){
        let result = await reqCartList();
        if(result.code==200){
            commit("GETCARTLIST",result.data);
        }
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.code == 200){
            return "ok";
        }else {
            return Promise.reject(new Error("faile"));
        }
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedByid(skuId,isChecked);
        if(result.code == 200){
            return "ok";
        }else {
            return Promise.reject(new Error("faile"));
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll = [];
        // commit:提交mutations修改state，getters:计算属性，dispatch:派发action
        getters.cartList.cartInfoList.forEach(item=>{
           let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):'';
           PromiseAll.push(promise);
        });
        // 只有全部的promise成功，Promise.All才成功，有一个失败返回结果为失败
        return Promise.all(PromiseAll);
    },
    // 修改全部产品选中状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach((item)=>{
            let promise = dispatch("updateCheckedById",{skuId:item.skuId,isChecked});
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    }
};
const getters = {
    cartList(state){
        return state.cartList[0]||{}
    }
};

export default{
    state,
    mutations,
    actions,
    getters
}