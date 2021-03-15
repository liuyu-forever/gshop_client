<template>
  <div style="background: green; height: 80px;">
    <h2>Event2组件</h2>
    <!-- <button @click="$emit('click','我就这样')">分发自定义click事件</button><br> -->
    <!-- 子组件中接收父组件传递的事件函数,并进行分发 -->
    <button @click="$emit('click', '子组件分发父组件的click事件(这是自定义事件)')">分发自定义click事件</button>
    <!-- 分发另一个自定义事件 -->
    <button @click="$emit('xxx','分发xxx事件')">分发自定义xxx事件</button><br>
  </div>
</template>
