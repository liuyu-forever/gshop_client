import {
  reqRegister,
  reqLogin,
  reqGetUserInfo,
  reqLogout,
  reqUserLocationData,
} from "@/api";
import { getTempId, saveToken, getToken, removeToken } from "@/utils";

const state = {
  userTempId: getTempId(), //用户临时数据凭证
  userInfo: {}, //用户信息对象
  token: getToken(), //token信息存储
  userAddressList: [], //用户地址信息数据
};
const mutations = {
  //直接修改用户信息
  RECEIVE_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  //重置用户信息(清空)
  RESET_USER_INFO(state) {
    state.userInfo = {};
  },
  //直接修改token信息
  RECEIVE_TOKEN(state, token) {
    state.token = token;
  },
  //重置token信息(清空)
  RESET_TOKEN(state) {
    state.token = "";
  },
  //修改用户地址信息
  RECEIVE_USERADDRESS_LIST(state, userAddressList) {
    state.userAddressList = userAddressList;
  },
};
const actions = {
  //注册
  async register({ commit }, userInfo) {
    const result = await reqRegister(userInfo);
    if (result.code !== 200) {
      throw new Error(result.message || "注册失败");
    }
  },
  //登录
  async login({ commit }, { phone, password }) {
    const result = await reqLogin(phone, password);
    if (result.code === 200) {
      //从接口返回的数据中
      const userInfo = result.data;
      const token = userInfo.token;
      delete userInfo.token;
      //存储用户信息
      commit("RECEIVE_USER_INFO", userInfo);
      //存储用户token信息
      commit("RECEIVE_TOKEN", token);
      //缓存token
      saveToken(token);
    } else {
      throw new Error(result.message || "登录失败");
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    //自动登录时调用
    const result = await reqGetUserInfo();
    if (result.code === 200) {
      commit("RECEIVE_USER_INFO", result.data);
    } else {
      throw new Error(result.message || "未登录");
    }
  },
  //退出
  async logout({ commit }) {
    const result = await reqLogout();
    if (result.code === 200) {
      //删除用户信息
      commit("RESET_USER_INFO");
      //删除token信息---vuex中
      commit("RESET_TOKEN");
      //删除t浏览器缓存的token信息
      removeToken();
    }
  },

  //获取用户地址信息
  async getUserLocationData({ commit }) {
    const result = await reqUserLocationData();
    if (result.code === 200) {
      commit("RECEIVE_USERADDRESS_LIST", result.data);
    }
  },
};
const getters = {};

export default {
  state, //包含了多个状态数据的对象
  mutations, //包含了多个直接修改状态数据的方法的对象
  actions, //包含了多个间接修改状态数据的方法的对象
  getters, //包含了多个状态数据的计算属性的get方法的对象
};
