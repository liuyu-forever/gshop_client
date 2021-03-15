<template>
  <div style="background: pink; height: 50px;">
    <h2>input包装组件</h2>
    <!-- <input type="text" :value="value" @input="$emit('input' , $event.target.value)" > -->
    <!-- 接收value属性并分发input事件 -->
    <input type="text" :value="value" @input="$emit('input', $event.target.value)">
  </div>                                                        
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'CustomInput',
    props:['value']
  }
</script>
