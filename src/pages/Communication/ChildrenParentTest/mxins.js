export const cpMixin = {
  methods: {
    borrowMoney(count) {
      this.money -= count
    },
    giveMoney(count) {
      this.money -= count
      //获取父组件
      console.log(this.$parent)
      this.$parent.money += count
    },
  },
}