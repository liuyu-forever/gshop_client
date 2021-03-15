import { reqOrderTradeData } from "@/api";
const state = {
  tradeInfo: {},  //订单交易信息数据
};
const mutations = {
  //更新订单交易信息
  RECEIVE_TRADEINFO(state, tradeInfo) {
    state.tradeInfo = tradeInfo;
  },
};
const actions = {
    //获取订单交易页信息
  async getOrderTradeData({ commit }) {
    const result = await reqOrderTradeData();
    if (result.code === 200) {
      commit("RECEIVE_TRADEINFO", result.data);
    }
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
