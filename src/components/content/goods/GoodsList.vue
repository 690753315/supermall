<template>
  <div class="goods">
    <!-- <goods-list-item></goods-list-item> -->
    <div v-for="item in goods"
      :key="item.title"
      class="goods-item"
      @click="goodsItemClick(item.iid)"
    >
      <!-- @load 监听图片加载完成事件 -->
      <!-- 因为数据结构不一样：item.show.img为首页的商品列表的图的数据 item.image为详情页的推荐的图的数据 -->
      <img :src="(item.show && item.show.img) || item.image" @load="imageLoad">
      <div class="goods-info">
        <p class="goods-title">{{item.title}}</p>
        <span class="price">￥{{item.price}}</span>
        <span class="collecttion">{{item.cfav}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "GoodsList",
  props: {
    goods:{
      type: Array,
      default(){
        return []
      }
    }
  },
  methods:{
    // 商品图片加载完成
    imageLoad(){
      // 触发事件
      // 方法1  写两个触发方法:imageLoad、detailImageLoad 根据当前活跃的路由 判断是imageLoad还是detailImageLoad
      // console.log(this.$route.path.indexOf('/home'), this.$route.path.indexOf('/detail'))

      // if ( this.$route.path.indexOf('/home') !== -1 ){
      //   this.$bus.$emit('imageLoad')
      // } else if ( this.$route.path.indexOf('/detail') !== -1 ){
      //   this.$bus.$emit('detailImageLoad')
      // }

      // 方法2  只写一个触发方法。利用this.$bus.$off()取消首页或者详情页的图片加载完成事件
      this.$bus.$emit('imageLoad')
    },

    // 点击商品
    goodsItemClick(id){
      // console.log( id )
      this.$router.push('/detail/'+id)
    }
  }

}
</script>

<style>
  .goods{
    display: flex;
    /* 自动换行 */
    flex-wrap: wrap;

    /* 设置图片两侧的距离相等 */
    justify-content: space-around;
    padding: 0;
  }

  .goods-item{
    width: 45%;
    padding-bottom: 40px;
    position: relative;
  }

  .goods-item img{
    width: 100%;
    border-radius: 5px;
    vertical-align: middle;
  }

  .goods-info{
    font-size: 12px;
    text-align: center;

    position: absolute;
    /* 设置宽度为100% */
    left: 0;
    right: 0;

    bottom: 8px;
  }

  .goods-info .goods-title{
    margin-bottom: 3px;

    /* 文本不换行，溢出时显示省略号 */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 30px;
  }

  .collecttion, .test{
    position: relative;
  }

  .collecttion:before, .test:before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 13px;
    height: 13px;
    background: url(~assets/img/common/collect.svg) 0 center/13px no-repeat;
  }
</style>