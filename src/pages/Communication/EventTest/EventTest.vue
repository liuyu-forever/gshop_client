<template>
  <div>
    <h1>EventTest组件</h1>
    
    <!-- 给标签绑定原生事件 -->
    <!-- <button @click="showMsg1">DOM原生事件1</button> -->
    <button @click="showMsg1">DOM原生事件1</button>
   
    <!-- <button @click="showMsg2($event)">DOM原生事件2</button> -->
    <button @click="showMsg2($event)">DOM原生事件2</button>
    <hr color="red" />
    
    <hr />
    <hr />

    <!-- 给组件绑定原生事件(使用.native来修饰) -->
    <!-- <Event1 @click.native="showMsg3" /> -->
    <Event1 @mousemove.native="showMsg3"></Event1>
    <Event1 @click.native="showMsg3"></Event1>

    <hr />

    <!-- 未用.native修饰的事件绑定在组件上,都是自定义事件 -->
    <Event2 @click="showMsg4" @xxx="xxx" />
  
  
  
  </div>
</template>

<script type="text/ecmascript-6">
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'

export default {
  name: 'EventTest',

  components: {
    Event1,
    Event2,
  },

  methods: {
    showMsg1() {
      console.log("这是DOM原生事件")
    },
    showMsg2(e) {
      console.log(e)
    },
    showMsg3() {
      console.log("组件的原生事件,利用冒泡原理")
    },
    showMsg4(txt) {
      console.log(txt)
    },
    xxx(txt) {
      console.log(txt)
    }
  },
}
</script>
