// 存放一些混合的js

// 防抖函数
import {debounce} from 'common/utils'

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