<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// 导入 better-scroll
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data(){
    return {
      scroll: null
    }
  },
  // 进行DOM操作要在mounted里进行，不能在created
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 默认情况下BScroll是不可以实时监听滚动位置的
      /*
        probe: 监测
        0,1都不会实时监测滚动位置
        2在手指滚动的过程会监测，手机离开后的惯性滚动不监测
        3只要是滚动都会监测
      */
      probeType: 3,
      /*
        默认情况下BScroll禁止移动端的原生js点击事件
        设置 click: true, 才可以点击
      */
      click: true,

      /*
        这个配置用于做上拉操作，默认为 false
      */
      pullUpLoad: true,
    })
  },
  methods:{
    backTop(){
      this.scroll.scrollTo(0, 0, 300)
    }
  }
}
</script>

<style>

</style>