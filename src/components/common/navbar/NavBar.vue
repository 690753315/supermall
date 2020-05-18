<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>
  :root{
    --nav-bar-height: 44px;
  }
  .nav-bar{
    display: flex;
    /* 设置navbar高度为44px */
    height: var(--nav-bar-height);
    line-height: var(--nav-bar-height);
  }
  .left, .right{
    width: 60px;
  }
  .center{
    /* flex: 1; 可以占满剩余的空间 */
    flex: 1;
    text-align: center;
  }
</style>