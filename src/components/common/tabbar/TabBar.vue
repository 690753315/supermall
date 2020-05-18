<template>
  <div id="tabbar">
    <!--
      在tabbar里用slot预订一些空间，
      如果有多个Dom，会一起插入到slot里面
    -->
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: 'tabbar',
}
</script>

<style>
  #tabbar{
    /* 子元素等宽 */
    display: flex;

    /* 设置固定于底部 */
    position: fixed;
    bottom: 0;

    /* 设置宽度100% */
    left: 0;
    right: 0;

    background-color: #f6f6f6;
    /* tabbar通常为49px */
    height: 49px;
    box-shadow: 0 -3px 5px rgba(100, 100, 100, 0.1);
  }
</style>