<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.link" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends:{
      type: Array,
      default(){
        return [];
      }
    }
  }
}
</script>

<style>
  .recommend{
    display: flex;
  }

  .recommend-item{
    flex: 1;
    text-align: center;
    padding: 15px 0 15px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 5px;
  }
</style>