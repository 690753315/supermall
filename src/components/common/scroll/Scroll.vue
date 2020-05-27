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
  props: {
    // 控制BScroll的probeType属性
    probeType:{
      type: Number,
      default: 0
    },
    // 控制BScroll的pullUpLoad属性
    pullUpLoad:{
      type: Boolean,
      default: false
    },
  },
  // 进行DOM操作、获取页面上的内容 要在mounted里进行，不能在created
  mounted(){

    // 1. 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 默认情况下BScroll是不可以实时监听滚动位置的
      /*
        probe: 监测
        0,1都不会实时监测滚动位置
        2在手指滚动的过程会监测，手机离开后的惯性滚动不监测
        3只要是滚动都会监测
      */
      probeType: this.probeType,
      /*
        默认情况下BScroll禁止移动端的原生js点击事件
        设置 click: true, 才可以点击
      */
      click: true,

      /*
        这个配置用于做上拉操作，默认为 false
      */
      pullUpLoad: this.pullUpLoad,
    })

    // 2. 监听滚动事件及滚动位置
    if (this.probeType === 2 || this.probeType === 3 ){
      this.scroll.on('scroll', position => {
        // 输出滚动条的位置
        console.log(position)

        // 滚动时， 发送自定义事件给父组件 并传递position
        this.$emit('scroll', position)
      })
    }

    // 3.监听上拉操作
    if (this.pullUpLoad){
      this.scroll.on('pullingUp', () => {
        // console.log('滚动到底部了')
        this.$emit('pullingUp')
        // 加个定时器，防止一直上拉加载。至少1秒才能进行一次上拉加载
        // setTimeout(() => {
        //   // 如果不加下面这一行，只会触发一次上拉操作
        //   this.bscroll.finishPullUp()
        // }, 1000)
      });
    }

  },
  methods:{
    /*  当其他组件调用this.scroll的方法时，this.scroll可能还未被new BScroll赋值，
    还是null、不存在这些方法，可能会报方法undefined，所以先判断是否存在this.scroll */
    backTop(x, y, time){
      // 滚动条回到指定位置
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp(){
      // 当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载。
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      /* 上拉加载完后，告诉BScroll重新计算content的高度，从而改变可滑动区域，
        不然可能还是以原来的区域为可滑动高度
      */
      this.scroll && this.scroll.refresh()

      // console.log('图片加载完成')
    },
    getScrollY(){
      return this.scroll? this.scroll.y: 0
    }
  }
}
</script>

<style>

</style>