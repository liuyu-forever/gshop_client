<template>
  <div style="background: #ccc; height: 50px">
    <span>小明每次花100元</span>
    <!-- <button @click="$emit('update',money-100)">花钱</button> -->
    <!-- 分发update:money事件 -->
    <button @click="$emit('update:money',money - 100)">花钱</button>
    爸爸还剩 {{money}} 元
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Child',
  // 接收父组件传递的数据
  props:['money']
}
</script>
