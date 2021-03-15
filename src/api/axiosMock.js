//配置mock接口请求,生成随机数据
//axios二次封装
//导入axios
import axios from "axios";
const ajax = axios.create({
  baseURL: "/mock", //配置请求根路径
  timeout: 20000, //请求超时时间
});
//导入加载进度条插件
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
//设置请求拦截器
ajax.interceptors.request.use(config => {
  Nprogress.start();
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
    alert("错误信息:" + error.message || "未知错误");
    return Promise.reject(error);
  }
);

export default ajax;
