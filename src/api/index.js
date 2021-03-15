//封装api二次请求函数
//导入二次封装的axios
import axios from "./axios";
import ajaxMock from "./axiosMock";

//获取首页三级分类信息数据
export const reqBaseCategoryList = () =>
  axios.get(`/product/getBaseCategoryList`);
//获取首页广告轮播图信息数据
export const reqBanners = () => axios.get(`/cms/banner`);
export const reqRecommends = () => ajaxMock.get(`/recommends`);
export const reqFloors = () => ajaxMock.get(`/floors`);
//获取商品信息对象
export const reqProductList = searchList => axios.post(`/list`, searchList);
//根据skuId获取当前产品的详情信息
export const reqDetailInfo = skuId => axios.get(`/item/${skuId}`);
//根据skuId获取当前产品的优惠券和活动券
export const reqCouponActivityList = skuId =>
  axios.get(`/activity/findActivityAndCoupon/${skuId}`);
//根据优惠券的id来领取优惠券的接口
export const reqGetCouponInfo = couponId =>
  axios.get(`/activity/auth/getCouponInfo/${couponId}`);

//登录接口
export const reqLogin = (phone, password) =>
  axios.post(`/user/passport/login`, { phone, password });
//注册接口
export const reqRegister = userInfo =>
  axios.post(`/user/passport/register`, userInfo);
//获取用户信息接口
export const reqGetUserInfo = () =>
  axios.get(`/user/passport/auth/getUserInfo`);
//退出接口
export const reqLogout = () => axios.get(`/user/passport/logout`);
//发送验证码接口
export const reqSendCode = phone =>
  axios.get(`/user/passport/sendCode/${phone}`);

//添加商品到购物车
export const reqAddtoCart = (skuId, skuNum) =>
  axios.post(`/cart/addToCart/${skuId}/${skuNum}`);
//获取购物车列表
export const reqGetShopCartList = () => axios.get(`/cart/cartList`);
//修改购物项的选中状态
export const reqChangeCheckCartItem = (skuID, isChecked) =>
  axios.get(`/cart/checkCart/${skuID}/${isChecked}`);
//批量修改购物项的选中状态
export const reqAllChangeCheckCartItem = (isChecked, skuIdList) =>
  axios.post(`cart/batchCheckCart/${isChecked}`, skuIdList);
//删除购物项的接口
export const reqDeleteCartItem = skuId =>
  axios.delete(`/cart/deleteCart/${skuId}`);
//批量删除购物项的接口
export const reqAllDeleteCartItem = skuIdList =>
  axios.delete(`/cart/batchDeleteCart`, { data: skuIdList });

//获取订单交易页信息api接口函数
export const reqOrderTradeData = () => axios.get(`/order/auth/trade`);
//获取用户地址信息数据api接口函数
export const reqUserLocationData = () =>
  axios.get(`/user/userAddress/auth/findUserAddressList`);
//获取大区地址信息api接口函数
export const reqAddressBaseRegion = () =>
  axios.get(`/user/userAddress/auth/findBaseRegion`);
//根据大区地址id获取省份信息api接口函数
export const reqAddressBaseProvince = regionId =>
  axios.get(`/user/userAddress/auth/findBaseProvinceByRegionId/${regionId}`);
//新增用户地址api接口函数
export const reqAddUserLocation = userAddressInfo =>
  axios.post(`/user/userAddress/auth/save`, userAddressInfo);
//删除用户地址api接口函数
export const reqDeleteUserLocation = userAddressId =>
  axios.get(`/user/userAddress/auth/delete/${userAddressId}`);
//更新用户地址api接口函数
export const reqUpdateUserLocatoin = userAddressId =>
  axios.post(`/user/userAddress/auth/update/`, userAddressId);

//提交订单的api接口函数
export const reqSubmitOrderInfo = (tradeNo, orderInfo) =>
  axios({
    method: "POST",
    url: "/order/auth/submitOrder",
    params: { tradeNo },
    data: orderInfo,
  });

//获取订单支付信息
export const reqPayInfo = payInfoId =>
  axios.get(`/payment/weixin/createNative/${payInfoId}`);

//获取订单商品详情信息
export const reqOrderDetail = orderDetailId =>
  axios.get(`/order/auth/getOrderDetail/${orderDetailId}`);

//查询订单支付状态
export const reqPayStatus = orderId =>
  axios.get(`/payment/weixin/queryPayStatus/${orderId}`);

//获取我的订单列表
export const reqOrderList = (page, limit) =>
  axios.get(`/order/auth/${page}/${limit}`);

//获取订单商品的详细信息
export const reqOrderDetailInfo = orderId =>
  axios.get(`/order/auth/${orderId}`);

// 获取退款列表数据的api接口
export const reqRefundList = (page, limit) =>
  axios.get(`/order/orderRefundInfo/auth/${page}/${limit}`);

// 发起退货
export const reqRefundInfo = orderRefundInfo =>
  axios.post(`/order/orderRefundInfo/auth/save`, orderRefundInfo);

// 退货后的发货
export const reqOrderRefundInfo = (id, trackingNo) =>
  axios.post(`/order/orderRefundInfo/auth/delevered/${id}/${trackingNo}`);
