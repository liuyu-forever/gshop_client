<template>
  <a href="javascript:;" :title="title">
    <!-- v-bind和v-on可以赋值一个对象 -->
     <el-button v-bind="$attrs" v-on="$listeners">主要按钮</el-button>
  </a>
</template>

<script>
export default {
  name: 'HintButton',
  props:['title'],
  created () {
    // 父级组件向子级组件中传递的数据中除了props接收的/class/style 其他的都可以获取到
    console.log(this.$attrs)  //$attrs可以获取到传入组件的所有属性(除了class和style)
    console.log(this.$listeners) //$listeners可以获取到传入组件的所有事件
  }
}





// <img v-bind:src="imageSrc">

// <button v-bind:[key]="value"></button>

// var obj = {
//   name:'小明'
// }

// obj.name
// var key = 'name'
// console.log(obj[key])
</script>