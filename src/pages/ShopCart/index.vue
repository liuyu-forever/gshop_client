<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <!-- 遍历购物车中的购物项 -->
        <ul
          class="cart-list"
          v-for="valueCart in shopCartList"
          :key="valueCart.createTime"
        >
          <li v-for="value in valueCart.cartInfoList" :key="value.id">
            <ul class="shopInfo">
              <!-- 购物项的商品选中 -->
              <li class="cart-list-con1">
                <input
                  type="checkbox"
                  name="chk_list"
                  :checked="value.isChecked"
                  @click="changeChecked(value)"
                />
              </li>
              <!-- 商品的默认图片和描述信息 -->
              <li class="cart-list-con2">
                <img :src="value.imgUrl" />
                <a
                  href="javascript:"
                  class="item-msg"
                  @click="$router.push(`/detail/${value.skuId}`)"
                >
                  {{ value.skuName }}
                </a>
              </li>
              <!-- 单价和优惠券及促销信息 -->
              <li class="cart-list-con4">
                <span class="price">999</span>
                <!--优惠券-->
                <div
                  v-if="
                    value.couponInfoList !== null &&
                      value.couponInfoList.length > 0
                  "
                >
                  <a
                    href="javascript:;"
                    class="sales-promotion"
                    @click="couponInfoIndex = value.id"
                    >优惠券<b></b
                  ></a>
                  <div
                    class="promotion-tips"
                    style="width: 315px"
                    v-if="couponInfoIndex === value.id"
                  >
                    <div class="promotion-tit">优惠券<b></b></div>
                    <div class="promotion-cont" style="width: auto">
                      <div
                        class="p-coupon-item p-coupon-item-gray"
                        v-for="valueCouponInfo in value.couponInfoList"
                        :key="valueCouponInfo.id"
                      >
                        <div
                          class="coupon-price"
                          style="border-color: rgb(231, 70, 73)"
                        >
                          <span
                            class="txt"
                            v-if="valueCouponInfo.couponType === 'CASH'"
                            style="color: rgb(231, 70, 73)"
                            >{{ valueCouponInfo.benefitAmount }}元</span
                          >
                          <span
                            class="txt"
                            v-if="
                              valueCouponInfo.couponType === 'FULL_REDUCTION'
                            "
                            style="color: rgb(231, 70, 73)"
                            >{{ valueCouponInfo.benefitAmount }}元</span
                          >

                          <span
                            class="txt"
                            v-if="
                              valueCouponInfo.couponType === 'FULL_DISCOUNT'
                            "
                            style="color: rgb(231, 70, 73)"
                            >{{ valueCouponInfo.benefitDiscount }}折</span
                          >
                          <span
                            class="txt"
                            v-if="valueCouponInfo.couponType === 'DISCOUNT'"
                            style="color: rgb(231, 70, 73)"
                            >{{ valueCouponInfo.benefitDiscount }}折</span
                          >

                          <!-- <span class="txt" style="color: rgb(231, 70, 73)">200元</span> -->
                        </div>
                        <div class="coupon-msg">
                          <div>
                            <span
                              class="ctype"
                              v-if="valueCouponInfo.couponType === 'CASH'"
                              >现金券</span
                            >
                            <span
                              class="ctype"
                              v-if="
                                valueCouponInfo.couponType === 'FULL_REDUCTION'
                              "
                              >满减券</span
                            >

                            <span
                              class="ctype"
                              v-if="
                                valueCouponInfo.couponType === 'FULL_DISCOUNT'
                              "
                              >折扣券</span
                            >
                            <span
                              class="ctype"
                              v-if="valueCouponInfo.couponType === 'DISCOUNT'"
                              >满减打折券</span
                            >

                            <!-- <span class="ctype">满减卷</span> -->

                            <span
                              class="cinfo"
                              v-if="valueCouponInfo.couponType === 'CASH'"
                              >现金券{{ valueCouponInfo.benefitAmount }}元</span
                            >
                            <span
                              class="cinfo"
                              v-if="
                                valueCouponInfo.couponType === 'FULL_REDUCTION'
                              "
                              >满{{ valueCouponInfo.conditionAmount }}减{{
                                valueCouponInfo.benefitAmount
                              }}元</span
                            >

                            <span
                              class="cinfo"
                              v-if="
                                valueCouponInfo.couponType === 'FULL_DISCOUNT'
                              "
                              >满{{ valueCouponInfo.conditionNum }}件打{{
                                valueCouponInfo.benefitDiscount
                              }}折</span
                            >
                            <span
                              class="cinfo"
                              v-if="valueCouponInfo.couponType === 'DISCOUNT'"
                              >折扣券{{
                                valueCouponInfo.benefitDiscount
                              }}折</span
                            >

                            <!-- <span class="cinfo">满20000减200元</span> -->
                          </div>
                          <div class="clearfix">
                            <div class="ftx-03 J_cpitems">
                              {{ valueCouponInfo.rangeDesc }}
                            </div>
                            <i class="zyc-ico"></i>
                          </div>
                        </div>
                        <div class="coupon-opbtns">
                          <span
                            class="ftx-03"
                            v-if="
                              valueCouponInfo.isGet > 0 &&
                                valueCouponInfo.couponStatus === 'NOT_USED'
                            "
                            >已领取</span
                          >
                          <button
                            class="ftx-03"
                            v-if="valueCouponInfo.isGet === 0"
                            @click="receiveCouponInfo(valueCouponInfo.id)"
                          >
                            领取
                          </button>
                          <!-- <span class="ftx-03">已领取</span> -->
                        </div>
                      </div>

                      <div class="op-btns ac mt20">
                        <a
                          href="javascript:"
                          class="btn-9 ml10 del cancel-promotion"
                          @click="closeCouponInfoAndActivity"
                          >取消</a
                        >
                      </div>
                    </div>
                    <div class="clr"></div>
                  </div>
                </div>
                <!-- 促销区域 -->
                <div
                  v-if="
                    valueCart.activityRuleList !== null &&
                      valueCart.activityRuleList.length > 0
                  "
                >
                  <a
                    href="javascript:;"
                    class="sales-promotion"
                    @click="activityIndex = value.id"
                    >促销<b></b
                  ></a>
                  <div class="promotion-tips" v-if="activityIndex === value.id">
                    <div class="promotion-tit" style="width: 43px">
                      促销<b></b>
                    </div>
                    <div class="promotion-cont">
                      <ul>
                        <template
                          v-for="(valueActivity,
                          index) in valueCart.activityRuleList"
                        >
                          <li
                            :key="valueActivity.id"
                            v-if="
                              valueActivity.activityType === 'FULL_REDUCTION'
                            "
                          >
                            <input
                              type="radio"
                              :name="valueActivity.skuId"
                              :value="index"
                              :checked="valueActivity.isChecked"
                            />
                            满{{ valueActivity.conditionAmount }}减{{
                              valueActivity.benefitAmount
                            }}
                          </li>
                          <li
                            :key="valueActivity.id"
                            v-else-if="
                              valueActivity.activityType === 'FULL_DISCOUNT'
                            "
                          >
                            <input
                              type="radio"
                              :name="valueActivity.skuId"
                              :value="index"
                              :checked="valueActivity.isChecked"
                            />
                            满{{ valueActivity.conditionNum }}件打{{
                              valueActivity.benefitDiscount
                            }}折
                          </li>
                        </template>
                      </ul>
                      <div class="op-btns ac mt20">
                        <a href="javascript:;" class="btn-1 select-promotion"
                          >确定</a
                        ><a
                          href="javascript:;"
                          class="btn-9 ml10 del cancel-promotion"
                          @click="closeCouponInfoAndActivity"
                          >取消</a
                        >
                      </div>
                      <div class="clr"></div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="cart-list-con5">
                <a
                  href="javascript:void(0)"
                  class="mins"
                  @click="updateSkuNum(value, -1)"
                  >-</a
                >
                <input
                  autocomplete="off"
                  type="text"
                  class="itxt"
                  :value="value.skuNum"
                  @change="updateSkuNum(value, 0, $event.target.value)"
                  @input="validInput($event)"
                />
                <a
                  href="javascript:void(0)"
                  class="plus"
                  @click="updateSkuNum(value, 1)"
                  >+</a
                >
              </li>
              <!-- 总价格 -->
              <li class="cart-list-con6">
                <span class="sum">{{ value.skuNum * value.skuPrice }}</span>
              </li>
              <!-- 删除单个购物项 -->
              <li class="cart-list-con7">
                <a href="javascript:;" class="sindelet" @click="delShop(value)"
                  >删除</a
                >
                <br />
                <a href="javascript:;">移到收藏</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input type="checkbox" class="chooseAll" v-model="allChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteCartValue">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择{{ allNum }}</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a href="/trade" class="sum-btn">结算</a> -->
          <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import debounce from "lodash/debounce";
export default {
  name: "ShopCart",
  mounted() {
    this.$store.dispatch("getShopCartList");
  },
  data() {
    return {
      couponInfoIndex: null,
      activityIndex: null,
    };
  },
  computed: {
    ...mapState({ shopCartList: state => state.shopcart.shopCartList }),
    ...mapGetters(["allCheck", "allPrice", "allNum"]),
    //全选按钮的状态
    allChecked: {
      get() {
        return this.allCheck;
      },
      set(val) {
        this.$store.dispatch("getAllChangeCheckCartItem", !val);
      },
    },
  },

  methods: {
    //修改当前的商品选中状态
    changeChecked: debounce(function(value) {
      const isChecked = value.isChecked ? "0" : "1";
      const skuId = String(value.skuId);
      try {
        this.$store.dispatch("getChangeCheckCartItem", { skuId, isChecked });
      } catch (error) {
        this.$message.error(error.messgae || "修改状态失败了");
      }
    }, 200),
    //领取优惠券
    async receiveCouponInfo(valueCouponInfoId) {
      const result = await this.$API.reqGetCouponInfo(valueCouponInfoId);
      if (result.code === 200) {
        this.$store.dispatch("getShopCartList");
      } else {
        throw new Error(result.messgae || "领取失败了");
      }
    },

    //修改当前商品的数量操作(加、减按钮和input的change事件)
    updateSkuNum: debounce(function(value, operation, targetValue) {
      const skuId = value.skuId;
      let skuNum = value.skuNum;
      //如果是触发的加减按钮
      if (operation === 1) {
        skuNum = 1;
      } else if (operation === -1) {
        skuNum = skuNum === 1 ? 0 : -1;
      }

      //如果是触发的change事件
      if (targetValue > 0) {
        skuNum = targetValue - skuNum;
      } else if (!targetValue && operation === 0) {
        skuNum = 0;
      }

      try {
        this.$store.dispatch("getAddToCart", {
          skuId,
          skuNum,
          isGet: true,
        });
      } catch (error) {
        this.$message.error(error.messgae || "操作失败");
      }
    }, 200),

    //修改当前商品的数量操作(文本框input事件的回调)
    validInput(event) {
      const value = event.target.value;
      event.target.value = value.replace(/^0+|\D+0*/, "");
    },

    //删除某个选中的商品
    delShop(value) {
      const skuId = value.skuId;
      this.$confirm("您确定要删除该商品码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("getDeleteCartItem", skuId)
            .then(() => {
              this.$message.success("删除成功");
            })
            .catch(error => {
              this.$message.error(error.messgae || "删除失败了");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //删除所有选中的购物项
    deleteCartValue() {
      this.$confirm("您确定要全部删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("getAllDeleteCartItem")
            .then(() => {
              this.$message.success("删除成功");
            })
            .catch(error => {
              this.$message.error(error.message || "删除失败了");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 关闭优惠券窗口或关闭促销活动列表窗口
    closeCouponInfoAndActivity() {
      this.couponInfoIndex = null;
      this.activityIndex = null;
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 5%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 35%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 15%;
      }
    }

    .cart-body {
      margin: 15px 0;

      .cart-list {
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
        border-left: 1px solid #ddd;
        width: 1198px;
        margin-bottom: 30px;
        /*height:82px;*/ /*不能设置高度，如果描述内容过多会溢出，应该由内容撑开*/
        /*overflow: hidden;*/
        &:after {
          content: "";
          display: block;
          clear: both;
        }
        & > li {
          float: left;
          width: 100%;
          border-top: 1px solid #ddd;
          padding: 20px;
          box-sizing: border-box;

          .shopInfo {
            width: 100%;
            /*overflow: hidden;*/
            & > li {
              float: left;
            }
            .cart-list-con1 {
              width: 5%;
            }

            .cart-list-con2 {
              width: 35%;

              img {
                width: 82px;
                height: 82px;
                float: left;
              }

              .item-msg {
                float: left;
                width: 150px;
                margin: 0 10px;
                line-height: 18px;
              }
            }

            .cart-list-con4 {
              width: 15%;
              div {
                position: relative;
                .sales-promotion {
                  color: #e2231a;
                  display: inline-block;
                  width: 56px;
                  border: 1px solid #f9d2d3;
                  text-align: left;
                  line-height: 20px;
                  padding: 0 5px 0 5px;
                  cursor: pointer;
                  background: #fff;
                  text-decoration: none;
                  overflow: hidden;
                  position: relative;
                  b {
                    position: absolute;
                    right: 8px;
                    top: 8px;
                    width: 7px;
                    height: 4px;
                    overflow: hidden;
                    font-weight: bolder;
                    background: url(https://misc.360buyimg.com/user/cart/css/i/cart-icons-202004.png) -82px -3px;
                  }
                  &:hover {
                    color: #e2231a !important;
                  }
                }
                .promotion-tips {
                  position: absolute;
                  padding: 10px 14px 10px 10px;
                  width: 276px;
                  top: 19px;
                  box-shadow: 0 0 2px 2px #eee;
                  border: 1px solid #e4393c;
                  background: none repeat scroll 0 0 #fff;
                  text-align: left;
                  z-index: 99;
                  .promotion-tit {
                    position: absolute;
                    height: 19px;
                    line-height: 17px;
                    border: 1px solid #e4393c;
                    border-bottom: 0;
                    top: -20px;
                    left: -1px;
                    background: #fff;
                    color: #e2231a;
                    padding: 0 15px 0 8px;
                    cursor: pointer;
                    width: 43px;
                  }
                  .promotion-cont {
                    position: relative;
                    z-index: 99;
                    line-height: 23px;
                    width: 280px;
                    ul {
                      display: block;
                      li {
                        display: block !important;
                        padding: 2px 5px;
                        .input {
                          border: 1px solid #ddd;
                          cursor: pointer;
                          box-sizing: border-box;
                          padding: 0;
                        }
                      }
                    }
                    .op-btns {
                      margin-top: 20px;
                      text-align: center;
                      .select-promotion {
                        font-family: arial, Microsoft YaHei;
                        display: inline-block;
                        height: 25px;
                        line-height: 25px;
                        background-color: #e74649;
                        background-image: linear-gradient(
                          0deg,
                          #e74649 0,
                          #df3134
                        );
                        border-radius: 3px;
                        color: #fff;
                        font-size: 12px;
                        font-weight: 400;
                        padding: 0 10px;
                        vertical-align: middle;
                        cursor: pointer;
                        border: 0;
                        float: none;
                        transition: all 0.2s ease-out;
                      }
                      .cancel-promotion {
                        margin-left: 10px;
                        transition: all 0.2s ease-out;
                        display: inline-block;
                        height: 23px;
                        line-height: 23px;
                        background-color: #f2f2f2;
                        background-image: linear-gradient(
                          0deg,
                          #f2f2f2 0,
                          #f7f7f7
                        );
                        border-radius: 3px;
                        color: #323333;
                        font-size: 12px;
                        font-weight: 400;
                        padding: 0 9px;
                        vertical-align: middle;
                        cursor: pointer;
                        float: none;
                        border: 1px solid #e1e1e1;
                      }
                    }
                    .p-coupon-item {
                      display: block;
                      margin: 10px 0;
                      overflow: hidden;
                      .coupon-price {
                        border-color: rgb(231, 70, 73);
                        position: relative;
                        height: 29px;
                        line-height: 29px;
                        width: 54px;
                        float: left;
                        font-size: 0;
                        margin: 2px 10px 0 0;
                        border: 1px solid #f9d2d3;
                        text-align: center;
                        padding: 0 2px;
                        .txt {
                          font-size: 12px;
                          color: rgb(231, 70, 73);
                          font-weight: 700;
                        }
                      }
                      .coupon-msg {
                        float: left;
                        width: 200px;
                        line-height: 18px;
                        font-weight: 400;
                      }
                      .coupon-opbtns {
                        float: left;
                        .coupon-btn {
                          display: inline-block;
                          height: 25px;
                          line-height: 25px;
                          background-color: #e74649;
                          border-radius: 3px;
                          color: #fff;
                          font-size: 12px;
                          font-weight: 400;
                          padding: 0 10px;
                          vertical-align: middle;
                          cursor: pointer;
                          border: 0;
                          float: none;
                        }
                      }
                    }
                  }
                }
              }
            }

            .cart-list-con5 {
              width: 15%;

              .mins {
                border: 1px solid #ddd;
                border-right: 0;
                float: left;
                color: #666;
                width: 6px;
                text-align: center;
                padding: 8px;
              }

              input {
                border: 1px solid #ddd;
                width: 40px;
                height: 33px;
                float: left;
                text-align: center;
                font-size: 14px;
              }

              .plus {
                border: 1px solid #ddd;
                border-left: 0;
                float: left;
                color: #666;
                width: 6px;
                text-align: center;
                padding: 8px;
              }
            }

            .cart-list-con6 {
              width: 15%;

              .sum {
                font-size: 16px;
              }
            }

            .cart-list-con7 {
              width: 15%;

              a {
                color: #666;
              }
            }
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
