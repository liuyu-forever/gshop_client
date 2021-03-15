import { reqProductList } from "@/api/index";
const state = {
  productList: {},  //存储商品信息对象数据
};

const mutations = {
  RECEIVE_PRODUCT_LIST(state, productList) {
    state.productList = productList;
  },
};

const actions = {
  //获取商品信息对象数据
  async getProductList({ commit }, searchList) {
    searchList = { ...searchList };
    //如果传递的参数内容为空,就舍弃
    Object.keys(searchList).forEach(key => {
      if (
        searchList[key] === "" ||
        (searchList[key] instanceof Array && searchList[key].length === 0)
      ) {
        delete searchList[key];
      }
    });
    const result = await reqProductList(searchList);
    if (result.code === 200) {
      commit("RECEIVE_PRODUCT_LIST", result.data);
    }
  },
};
const getters = {
  //获取商品信息对象数据
  trademarkList(state) {
    return state.productList.trademarkList || [];
  },
  //获取平台属性信息数据
  attrsList(state) {
    return state.productList.attrsList || [];
  },
  //获取产品信息数组数据
  goodsList(state) {
    return state.productList.goodsList || [];
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
