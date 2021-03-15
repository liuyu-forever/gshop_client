//axios二次封装
//导入axios
import axios from "axios";
//重新创建一个axios实例,需要传入一个配置对象
const ajax = axios.create({
  baseURL: "/api", //配置请求根路径
  timeout: 20000, //请求超时时间
});
//导入加载进度条插件
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
//导入store对象
import store from "@/store";
//导入路由器对象
import router from "@/routers";
//导入element-ui的组件
import { Message } from "element-ui";
//设置请求拦截器
ajax.interceptors.request.use(config => {
  Nprogress.start();
  //获取userTempId
  const userTempId = store.state.user.userTempId;
  //获取token
  const token = store.state.user.token;
  //添加到请求头中
  config.headers.userTempId = userTempId;
  config.headers.token = token;
  return config;
});

//设置响应拦截器
ajax.interceptors.response.use(
  response => {
    Nprogress.done();
    return response.data;
  },
  error => {
    Nprogress.done();
    const { response } = error;
    //判断请求的时候响应回来的数据错误信息数据是否存在
    if (response && response.status) {
      //如果错误码是401,则是token问题
      if (response.status === 401) {
        //判断当前是否在登录页面
        //currentRoute表示路由信息对象,相当于route
        if (router.currentRoute.path !== "/login") {
          store.dispatch("logout");
          router.replace("/login");
        }
      } else {
        Message.error("请求出错了" + error.message);
      }
    } else if (!response) {
      Message.error("您的网路资源有问题");
    }

    //alert("错误信息:" + error.message || "未知错误");
    return Promise.reject(error);
  }
);

export default ajax;
