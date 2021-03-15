<template>
  <div>
    <div class="yui3-u-5-6">
      <div class="body userAddress">
        <div class="address-title">
          <span class="title">申请售后</span>
          <span class="clearfix"></span>
        </div>

        <div class="address-detail">
          <table class="sui-table table-bordered">
            <thead>
              <tr>
                <th>商品</th>
                <th>商品名称</th>
                <th>购买数量</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img :src="detailInfo.imgUrl" style="width: 80px" />
                </td>
                <td>{{detailInfo.skuName}}</td>
                <td>{{detailInfo.skuNum}}个</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="modal-dialog"
          style="border: 1px #ededed solid; padding: 10px 10px"
        >
          <div class="modal-content">
            <div class="modal-body">
              <form action="" class="sui-form form-horizontal">
                <div class="control-group">
                  <label class="control-label">服务类型：</label>
                  <div class="controls" style="line-height: 28px">{{refundType === 'REFUND' ? "退款" : "退货"}}</div>
                </div>
                <div class="control-group">
                  <label class="control-label">退款方式：</label>
                  <div class="controls" style="line-height: 28px">
                    原支付方式返回
                  </div>
                </div>
                <div class="control-group">
                  <label class="control-label">退款金额：</label>
                  <div class="controls" style="line-height: 28px">
                    <input type="text" class="input-medium" v-model="orderRefundInfo.refundAmount" />
                  </div>
                </div>
                <div class="control-group">
                  <label class="control-label">提交数量：</label>
                  <div class="controls" style="line-height: 28px">{{detailInfo.skuNum}}</div>
                </div>
                <div class="control-group">
                  <label class="control-label">提交原因：</label>
                  <div class="controls">
                    <select style="padding-right: 0px; max-width: 450px" v-model="orderRefundInfo.refundReasonType">
                      <option value="R_1301">商品损坏</option>
                      <option value="R_1302">商品描述与实际描述不一致</option>
                      <option value="R_1303">缺货</option>
                      <option value="R_1304">号码不合适</option>
                      <option value="R_1305">拍错</option>
                      <option value="R_1306">不想买了</option>
                      <option value="R_1307">其他</option>
                    </select>
                  </div>
                </div>
                <div class="control-group">
                  <label class="control-label">问题描述：</label>
                  <div class="controls">
                    <textarea
                      id="inputComment"
                      placeholder="商品是否给力？快分享你的购物心得吧~"
                      maxlength="500"
                      style="width: 500px; height: 80px"
                      v-model="orderRefundInfo.refundReasonTxt"
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
            <div class="submit">
              <button class="sui-btn btn-danger btn-submit" @click="save">提交</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Refund',
  data() {
    return {
      orderDetailId: 0, //订单详情页的id
      refundType: "",  //退货/退款的标识
      detailInfo: {}, //当前订单中的商品详情信息数据
      orderRefundInfo: {
        orderId: 0, //订单的id
        skuId: 1,  //skuId
        refundType: "", //类型
        refundAmount: 0, //金额
        refundNum: 1, //数量
        refundReasonType: "",  //退款的原因
        refundReasonTxt: "" //退款的理由
      }
    }
  },
  beforeMount() {
    const { orderId, refundType, orderDetailId } = this.$route.query;
    //保存订单的id
    this.orderRefundInfo.orderId = orderId
    //1-->退款,2-->退货
    this.refundType = refundType === "1" ? "REFUND" : "RETURN_GOODS";
    this.orderRefundInfo.refundType = this.refundType;
    this.orderDetailId = orderDetailId;
  },

  mounted() {
    //获取订单的详情信息
    this.getOrderDetail();
  },
  methods: {
    async getOrderDetail() {
      const result = await this.$API.reqOrderDetail(this.orderDetailId);
      if (result.code === 200) {
        //保存当前订单的详细信息
          this.detailInfo = result.data;
          this.orderRefundInfo.skuId = this.detailInfo.skuId;
          this.orderRefundInfo.refundNum = this.detailInfo.refundNum

      } else {
        this.$message.error(result.message || "获取订单的详情信息失败了")
      }
    },

    //点击提交按钮
    async save() {
      //退款金额不能大于商品金额
      if (this.detailInfo.orderPrice <= this.orderRefundInfo.refundAmount) {
        this.$message.error("退款金额不能大于商品金额")
        return
      }

      //退款理由必填
      if (this.orderRefundInfo.refundReasonTxt === "") {
        this.$message.warning("问题描述必须要填");
        return
      }

      //退款原要必填
      if (this.orderRefundInfo.refundReasonType === "") {
        this.$message.warning("请添加一个原因")
        return
      }

      //调用接口
      const result = await this.$API.reqRefundInfo(this.orderRefundInfo);
      if (result.code === 200) {
        this.$message.success("提交成功");
        this.$router.replace("/center/myorder")
      } else {
        this.$message.error(result.message || "提交失败了")
      }
    }
  },

}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.userAddress {
  padding: 0 25px;
  color: #555;
  .address-title {
    padding: 5px 10px;
    margin-bottom: 15px;
    line-height: 32px;
    background-color: #f1f1f1;
    .title {
      line-height: 40px;
      font-size: 15px;
      font-weight: 700;
    }
    .add-new {
      float: right;
      line-height: 24px;
      margin: 5px 0;
    }
  }
  .address-detail {
    width: 100%;
    .sui-table.table-bordered {
      width: 100%;
      border: 1px solid #e6e6e6;
      border-collapse: separate;
      border-left: 0;
      border-radius: 2px;
      th {
        background-color: #f4f4f4;
        border-left: 1px solid #e6e6e6;
      }
      td {
        border-left: 1px solid #e6e6e6;
      }
      thead th {
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .modal-content {
    .modal-body {
      .control-group {
        margin-bottom: 18px;
        display: flex;
        /*height: 28px;*/
        line-height: 28px;
      }
    }
    .submit {
      text-align: center;
      .btn-submit {
        width: 220px;
        height: 48px;
        line-height: 48px;
        margin-right: 10px;
        padding: 0;
        font-family: 'Microsoft YaHei';
        font-size: 18px;
        color: #fff;
        background-color: #ea4a36;
        border: 1px solid #e8351f;
      }
    }
  }
}
</style>
