<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 因为具名插槽会被dom替换掉，所以在插槽外添加div，将v-if class style放在div上 -->
    <!-- 通过v-if显示活跃或者不活跃的图标 -->
    <div v-if="!isActive">
      <!-- 具名插槽，放不活跃的图标 -->
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <!-- 具名插槽，放活跃的图标 -->
      <slot name="item-icon-active"></slot>
    </div>
    <!-- 动态绑定样式 -->
    <div :style="activeStyle">
      <!-- 具名插槽，放图标下方的文字 -->
      <slot name=item-text></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabbaritem',
  data(){
    return {
    }
  },
  props: {
    // 设置path，默认为'home'，string类型
    path: {
      type: String,
      default: '/Home'
    },
    // 设置color，默认为'#ff5777'，string类型
    activeColor: {
      type: String,
      default: '#ff5777'
    }
  },
  methods:{
    // 点击组件后设置路由为为当前组件对应的path
    itemClick(){
      this.$router.replace(this.path)
    }
  },
  computed:{
    // 通过当前组件的path是否等于当前活跃的路由的path判断组件是否处于活跃
    isActive(){
      return this.path === this.$route.path
    },
    // 如果当前组件处于活跃，动态绑定样式
    activeStyle(){
      return this.isActive?{color:this.activeColor}:{}
    }
  }
}
</script>

<style>
  .tab-bar-item{
    /* 设置每个子组件等宽 */
    flex: 1;

    text-align: center;
    font-size: 14px;
  }

  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;

    /* 隐藏img下方的空白 */
    vertical-align: middle;
  }
</style>