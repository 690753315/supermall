<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="item"
      class="tab-control-item"
      @click="itemClick(index)">
      <!-- 动态绑定active类 -->
      <span :class="{'active':currentIndex===index}">
        {{item}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data(){
    return {
      currentIndex: 0
    }
  },
  props: {
    titles:{
      type: Array,
      default(){
        return []
      }
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index

      // 子组件向父组件传值
      this.$emit('itemClick', index)
    }
  }
}
</script>

<style>
  .tab-control{
    display: flex;

    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;

    /* 暂时用这个控制，后面换其他的 */
    position: sticky;
    /* 滑到这个top值后固定 */
    top: var(--nav-bar-height);

    background-color: var(--color-background);

    /* 防止上滑被商品列表挡住 */
    z-index: 9;
  }

  .tab-control-item{
    flex: 1;
  }

  .tab-control-item>span{
    padding: 3px;
  }

  .tab-control-item>span.active{
    color: var(--color-high-text);
    border-bottom: 2px solid var(--color-tint);
  }

</style>