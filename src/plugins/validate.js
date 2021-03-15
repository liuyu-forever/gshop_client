import Vue from "vue";
import VeeValidate from "vee-validate";
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(VeeValidate);

VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages,
    is: field => `${field}和密码必须是一样的`,
  },
  //翻译表单验证的字段
  attributes: {
    phone: "手机号码",
    code: "短信验证码",
    password: "密码",
    password2: "确认密码",
    isAgree: "同意",
  },
});

//添加扩展的验证信息
VeeValidate.Validator.extend("phone", {
  //提示信息
  getMessage: field => `请输入正确的` + field,
  validate: value => {
    return /^[1]\d{10}$/.test(value);
  },
});
