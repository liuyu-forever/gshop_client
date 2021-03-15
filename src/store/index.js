//导入Vue
import Vue from "vue";
//导入Vuex 
import Vuex from "vuex";
//声明使用vuex
Vue.use(Vuex);
//导入vuex核心文件(Vuex模块化)
import modules from "./modules/index"
//创建Vuex的Store对象,并暴露出去
export default new Vuex.Store({
    modules
})