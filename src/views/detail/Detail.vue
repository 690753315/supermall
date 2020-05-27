<template>
  <div id="detail">
    <!-- 注意props命名 -->
    <detail-nav-bar class="detail-nav-bar"/>
    <!-- 一定要设置可滚动的高度，不然不能滚动 -->
    <scroll class="scroll">
      <detail-swiper :top-images="topImages"  />
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
    </scroll>

  </div>
</template>

<script>
// 导航栏
import DetailNavBar from 'views/detail/childComps/DetailNavBar'
// 轮播图
import DetailSwiper from 'views/detail/childComps/DetailSwiper'
// 基本信息
import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'
// 店铺信息
import DetailShopInfo from 'views/detail/childComps/DetailShopInfo'
// better-scroll
import Scroll from 'components/common/scroll/Scroll'

// 网络请求  详情页类
import {getDetail, Goods, Shop} from 'network/detail'

export default {
  name: "Detail",
  data(){
    return {
      id: '',
      topImages: [],
      goods: {},
      shop: {}
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
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,

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
        // 店铺信息
        this.shop = new Shop(data.shopInfo)
      })
    }
  }
}
</script>

<style scoped>
  /* 详情页的内容不让tabbar盖住 */
  #detail{
    position: relative;
    z-index: 10;
    background-color: #fff;
  }

  /* 设置可滚动的高度 */
  .scroll{
    height: calc(100vh - var(--nav-bar-height));
  }
  /* 防止navbar在页面上滑的时候被挡到 */
  .detail-nav-bar{
    /* 能用相对定位的就不要用绝对定位和fixed */
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>