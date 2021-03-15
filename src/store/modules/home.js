//导入api接口函数
import {
  reqBaseCategoryList,
  reqBanners,
  reqRecommends,
  reqFloors,
} from "@/api/index";
const state = {
  baseCategoryList: [], //存储三级分类信息的数据
  banners: [], //存储轮播图的图片数据
  recommends: [], //存储今日推荐数据
  floors: [], //存储楼层数据
};

const mutations = {
  RECEIVE_BASE_CATEGORY_LIST(state, baseCategoryList) {
    state.baseCategoryList = baseCategoryList.splice(
      0,
      baseCategoryList.length - 2
    );
  },
  RECEIVE_BANNERS(state, banners) {
    state.banners = banners;
  },
  RECEIVE_RECOMMENDS(state, recommends) {
    state.recommends = recommends;
  },
  RECEIVE_FLOORS(state, floors) {
    state.floors = floors;
  },
};

const actions = {
  //获取三级分类信息的数据
  async getBaseCategoryList({ commit }) {
    const result = await reqBaseCategoryList();
    if (result.code === 200) {
      commit("RECEIVE_BASE_CATEGORY_LIST", result.data);
    }
  },
  //获取轮播图数据
  async getBanners({ commit }) {
    const result = await reqBanners();
    if (result.code === 200) {
      commit("RECEIVE_BANNERS", result.data);
    }
  },
  //获取今日推荐数据
  async getRecommends({ commit }) {
    const result = await reqRecommends();
    if (result.code === 200) {
      commit("RECEIVE_RECOMMENDS", result.data);
    }
  },
  //获取楼层数据
  async getFloors({ commit }) {
    const result = await reqFloors();
    if (result.code === 200) {
      commit("RECEIVE_FLOORS", result.data);
    }
  },
};

const getters = {};
export default {
  state,
  actions,
  mutations,
  getters,
};
