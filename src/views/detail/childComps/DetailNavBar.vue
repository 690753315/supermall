<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles" :key="item"
        class="title-item" :class="{'active':currentIndex === index}"
        @click="titleClick(index)">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: "DetailNavBar",
  data(){
    return {
      titles:['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    }
  },
  components:{
    NavBar
  },
  methods:{
    titleClick(index){
      this.currentIndex = index

      this.$emit('titleClick', index)
    },
    backClick(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 13px;
  }

  .title-item{
    flex: 1;
  }

  .active{
    color: var(--color-high-text);
  }

  .back>img{
    width: 20px;
    height: 20px;
  }
</style>