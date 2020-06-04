// 存放一些混合的js

// 防抖函数
import {debounce} from 'common/utils'
  // 回顶部按钮
  import BackTop from 'components/content/backTop/BackTop'
  // 常量
  import {Back_Position} from 'common/const'

export const itemListenerMixin = {
  data(){
    return {
      // 商品列表图片加载完成时运行的函数
      itemImgListener: null,
    }
  },
  mounted(){
    // 防抖函数  this.debounce 返回一个函数
    const refresh = debounce( this.$refs.scroll.refresh, 500 )
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('imageLoad', this.itemImgListener)
    // console.log('这里是混入的内容')
  }
}

// 周期函数里面的内容会合并，但是methods只会合并不同的函数，如果两边有相同的函数名，则会覆盖重名的函数
// 所以scroll(){this.isBackTopShow = (position.y < -1000)}不能再这里写，因为两边都有会覆盖
// 但是可以再写一个监听滚动的方法，比如说listenShowBackTop()
export const backTopMixin = {
  data(){
    return {
      // 控制backTop组件的显示和隐藏
      isBackTopShow: false,
    }
  },
  components:{
    BackTop
  },
  methods:{
    // 点击回顶部按钮
    backClick(){
      // 不知道是什么原因，电脑端的手机模式用鼠标滚轮滑下去后点击没反应
      // 要用鼠标模拟手机下滑页面后 点击才有效果
      // 不是已经兼容PC端了吗
      this.$refs.scroll.backTop(0, 0, 300 )
    },
    listenShowBackTop(positionY){
      this.isBackTopShow = positionY > Back_Position
    }
  }
}