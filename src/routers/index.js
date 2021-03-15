//导入Vue
import Vue from "vue";
//导入vue-router
import VueRouter from "vue-router";
//导入路由表
import routes from "./routes";
//声明使用路由
Vue.use(VueRouter);
import store from "@/store/index";

//创建路由器对象并暴露出去
const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    //设置滚动条的横纵坐标
    return { x: 0, y: 0 };
  },
});

const checkPath = ["/pay", "/center", "/trade"];
//全局前置路由守卫
router.beforeEach(async (to, from, next) => {
  //目标路由地址
  const targetPath = to.path;
  //是否需要检测路由
  const needPath = checkPath.some(value => targetPath.startsWith(value));
  const { userInfo, token } = store.state.user;
  //是否有用户信息
  if (userInfo.name) {
    next();
    return;
  } 
  //是否有token信息
  if (token) {
    try {
      await store.dispatch("getUserInfo");
      next();
      return;
    } catch (error) {
      store.dispatch("logout");
      next(`/login?redirect=${to.path}`);
    }
  }
  //检测路由地址,如果路由地址不需要登录就可以访问
  if (!needPath) {
    next();
    return;
  }
  
  next(`/login?redirect=${to.path}`);
});

export default router;


