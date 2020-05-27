<template>
  <div id="detail">
    <!-- 注意props命名 -->
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"  />
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
// 导航栏
import DetailNavBar from 'views/detail/childComps/DetailNavBar'
// 轮播图
import DetailSwiper from 'views/detail/childComps/DetailSwiper'
// 基本信息
import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'

// 网络请求
import {getDetail, Goods} from 'network/detail'

export default {
  name: "Detail",
  data(){
    return {
      id: '',
      topImages: [],
      goods: {}
    }
  },
  created(){
    // 获取商品的id
    this.id = this.$route.params.id

    this.getDetail(this.id)
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo
  },
  methods:{
    // 获取轮播图数据
    getDetail(id){
      // 网络请求
      getDetail(id).then( res=>{
        console.log(res)

        const data = res.data.result
        // 轮播图
        this.topImages = data.itemInfo.topImages
        // 商品基本信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      })
    }
  }
}
</script>

<style>

</style>