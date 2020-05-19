<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.link">
      <a :href="item.link">
        <img :src="item.image">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// 如果是index开头的文件，路径可以省略不写   下面省略了 '/index.js'
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
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
  }
}
</script>

<style>

</style>