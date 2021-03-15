import {
  reqAddtoCart,
  reqGetShopCartList,
  reqChangeCheckCartItem,
  reqAllChangeCheckCartItem,
  reqAllDeleteCartItem,
  reqDeleteCartItem,
} from "@/api/index";
const state = {
  shopCartList: [], //购物车中的商品信息数据
};
const mutations = {
  //修改购物车列表数据
  RECEIVE_SHOP_CART_LIST(state, shopCartList) {
    state.shopCartList = shopCartList;
  },
};
const actions = {
  //添加购物车数据
  async getAddToCart({ commit, dispatch }, { skuId, skuNum, isGet }) {
    const result = await reqAddtoCart(skuId, skuNum);
    if (result.code !== 200) {
      throw new Error(result.message || "添加购物车失败");
    } else if (isGet) {
      dispatch("getShopCartList");
    }
  },
  //查看购物车数据
  async getShopCartList({ commit }) {
    const result = await reqGetShopCartList();
    if (result.code === 200) {
      commit("RECEIVE_SHOP_CART_LIST", result.data);
    }
  },
  //修改购物项的选中状态
  async getChangeCheckCartItem(
    { commit, dispatch, state },
    { skuId, isChecked }
  ) {
    const result = await reqChangeCheckCartItem(skuId, isChecked);
    if (result.code !== 200) {
      throw new Error(result.message || "修改状态失败");
    } else {
      dispatch("getShopCartList");
    }
  },

  //批量修改购物项的选中状态
  async getAllChangeCheckCartItem({ state, dispatch }, isCheck) {
    const isChecked = isCheck ? 0 : 1;
    //存储所有选中的购物项的skuId数据
    const skuIdList = [];
    //遍历所有的购物项
    state.shopCartList.forEach(valueCart => {
      valueCart.cartInfoList.forEach(value => {
        if (value.isChecked !== isChecked) {
          skuIdList.push(value.skuId);
        }
      });
    });
    const result = await reqAllChangeCheckCartItem(isChecked, skuIdList);
    if (result.code === 200) {
      dispatch("getShopCartList");
    } else {
      throw new Error(result.message || "批量修改选中状态失败了");
    }
  },
  //删除选中的购物项
  async getDeleteCartItem({ commit, dispatch }, skuId) {
    const result = await reqDeleteCartItem(skuId);
    if (result.code !== 200) {
      throw new Error(result.message);
    } else {
      dispatch("getShopCartList");
    }
  },
  //批量删除选中的购物项
  async getAllDeleteCartItem({ commit, state, dispatch }) {
    const skuIdList = [];
    state.shopCartList.forEach(valueCart => {
      valueCart.cartInfoList.forEach(value => {
        if (value.isChecked === 1) {
          skuIdList.push(value.skuId);
        }
      });
    });

    if (skuIdList.length <= 0) {
      throw new Error("未选中商品");
    }

    const result = await reqAllDeleteCartItem(skuIdList);
    if (result.code === 200) {
      dispatch("getShopCartList");
    } else {
      throw new Error(result.message || "批量删除失败了");
    }
  },
};
const getters = {
  //商品总数量
  allNum(state) {
    return state.shopCartList.reduce((initial, valueCart) => {
      return (
        initial +
        valueCart.cartInfoList.reduce(
          (initial, value) =>
            initial + (value.isChecked === 1 ? value.skuNum : 0),
          0
        )
      );
    }, 0);
  },

  //商品总价格
  allPrice(state) {
    return state.shopCartList.reduce((initial, valueCart) => {
      return (
        initial +
        valueCart.cartInfoList.reduce(
          (initial, value) =>
            initial +
            (value.isChecked === 1 ? value.skuNum * value.skuPrice : 0),
          0
        )
      );
    }, 0);
  },

  //全选按钮状态
  allCheck(state, getters) {
    if (state.shopCartList.length <= 0) {
      return false;
    }
    return state.shopCartList.every(valueCart => {
      return valueCart.cartInfoList.every(value => value.isChecked);
    });
  },

  
}



export default {
  state,
  mutations,
  actions,
  getters,
};
