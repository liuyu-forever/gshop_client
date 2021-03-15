import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
//执行插件文件
import "./plugins/swiper";
import "./plugins/validate";
import "./plugins/element-ui";
//执行mock文件
import "./mock/index";
//导入API接口函数
import * as API from "@/api";
//引入路由器对象
import router from "./routers/index";
//引入vuex,并注册
import store from "./store/index";
//引入全局组件
import TypeNav from "./components/TypeNav/index.vue";
import Pagination from "./components/Pagination/index.vue";
import "@/components/AddressModel";

//引入图片懒加载
import VueLazyload from "vue-lazyload";
//引入图片
import loading from "./assets/images/loading.gif";
Vue.use(VueLazyload, {
  loading, //使用引入的懒加载图片
});
//注册全局组件
Vue.component("TypeNav", TypeNav);
Vue.component("Pagination", Pagination);

//将API接口函数对象扩展到Vue的原型上
Vue.prototype.$API = API;

//重写路由器对象上的push和replace
//location, onComplete = () => {}, onAbort
const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location, onComplete = () => {}, onAbort) {
  return originPush.call(this, location, onComplete, onAbort);
};
const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function(
  location,
  onComplete = () => {},
  onAbort
) {
  return originReplace.call(this, location, onComplete, onAbort);
};

Vue.config.productionTip = false;
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = new Vue();
  },
  render: h => h(App),
  router,
  store,
}).$mount("#app");

