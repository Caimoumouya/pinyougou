import {reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api";
// 生成一个随机字符串(不能再变了)
import {getUUID} from '@/utils/uuid_token';
const state = {
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
};
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    }
};
const actions = {
    async getGoodInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId);
        if(result.code == 200){
            commit ("GETGOODINFO",result.data);
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}) {
        // 发请求前台将参数带给服务器,服务器返回code==200,代表成功,并不返回其他数据,因此不需要三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        // 函数执行返回结果一定是一个promise,要么成功,要么失败
        if(result. code==200){
            return "ok"
        }else{
            return Promise.reject(new Error('faile'));
        }
    }
};
// 简化数据而生
const getters = {
    categoryView(state){
        // state.goodInfo初始状态为空，空对象的categoryView为undefined
        return state.goodInfo.categoryView||{};
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{};
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[];
    }
};
export default{
    state,
    actions,
    mutations,
    getters
}