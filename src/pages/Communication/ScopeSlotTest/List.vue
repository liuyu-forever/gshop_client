<template>
  <ul>

    <!-- <slot>的所有属性都自动会传递给父组件 -->
    <li v-for="(item, index) in data" :key="item.id">
      <!--普通插槽-->
      <!-- <slot /> -->
      <!--命名插槽(具名插槽)-->
      <!-- <slot name="right"> -->
      <!-- 子组件通过slot来传递数据 -->
      <slot :row="item" :$index="index" />
      </li>
    
  </ul>
</template>

<script>
export default {
  name: "List",
  props: {
    data: Array,
  },
};
</script>
