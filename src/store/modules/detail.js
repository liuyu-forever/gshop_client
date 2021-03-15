import { reqCouponActivityList, reqDetailInfo } from "@/api/index";
const state = {
  detailInfo: {}, //商品的详情信息对象
  couponInfoList: [], //优惠券的列表数据数组
  activityRuleList: [], //获取活动列表的数据数组
};

const mutations = {
  //修改商品的详情数据
  RECEIVE_DETAIL_INFO(state, detailInfo) {
    state.detailInfo = detailInfo;
  },
  //修改优惠券的活动列表的数据
  RECEIVE_COUPON_ACTIVITY_LIST(state, { couponInfoList, activityRuleList }) {
    state.couponInfoList = couponInfoList;
    state.activityRuleList = activityRuleList;
  },
};

const actions = {
  //获取商品的详情数据
  async getDetailInfo({ commit }, skuId) {
    const result = await reqDetailInfo(skuId);
    if (result.code === 200) {
      commit("RECEIVE_DETAIL_INFO", result.data);
    }
  },
  //获取优惠券的活动列表的数据
  async getCouponActivityList({ commit }, skuId) {
    const result = await reqCouponActivityList(skuId);
    if (result.code === 200) {
      const { couponInfoList, activityRuleList } = result.data;
      commit("RECEIVE_COUPON_ACTIVITY_LIST", {
        couponInfoList,
        activityRuleList,
      });
    }
  },
};
const getters = {
  //销售属性值对应产品id的键值对数据
  valuesSkuJson(state) {
    return state.detailInfo.valuesSkuJson || [];
  },
  //分类信息数据对象
  categoryView(state) {
    return state.detailInfo.categoryView || {};
  },
  //销售属性值数组
  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList || [];
  },
  //产品的详情信息对象
  skuInfo(state) {
      const skuInfo = state.detailInfo.skuInfo;
      return skuInfo ? skuInfo : {}
  },
  //轮播图信息图片数组
  skuImageList(state) {
      const skuInfo = state.detailInfo.skuInfo;
      return skuInfo ? skuInfo.skuImageList : [];
  },
};
export default {
  state,
  actions,
  mutations,
  getters,
};
