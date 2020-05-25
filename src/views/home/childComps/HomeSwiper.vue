<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.link">
      <a :href="item.link">
        <img :src="item.image" @load="swiperImageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// 如果是index开头的文件，路径可以省略不写   下面省略了 '/index.js'
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  data(){
    return {
      isImageLoad: false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    banners:{
      type: Array,
      // default也可以是个函数，返回一个数据
      default(){
        return []
      }
    }
  },
  methods:{
    swiperImageLoad(){
      // 只要有一张banner加载完成，就不再执行以下的代码
      if (this.isImageLoad === false){
        this.$emit('swiperImageLoad')
        this.isImageLoad = true
      }
    }
  }
}
</script>

<style>

</style>