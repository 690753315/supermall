<template>
  <div class="goods">
    <!-- <goods-list-item></goods-list-item> -->
    <div v-for="item in goods" :key="item.show.img" class="goods-item">
      <img :src="item.show.img">
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
    padding: 0 6px;
  }

  .goods-item{
    width: 47%;
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
    width: 13px;
    height: 13px;
    background: url(/img/collect.eb1f91fb.svg) 0 center/13px no-repeat;
  }
</style>