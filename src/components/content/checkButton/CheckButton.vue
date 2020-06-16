<template>
  <div class="check-button" :class="{'check':isChecked}">
    <img src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
export default {
  name:"CheckButton",
  props:{
    isChecked:{
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
  .check-button{
    border: 2px solid #aaa;
    border-radius: 50%;
  }

  .check-button.check{
    background-color: red;
    border: 2px solid red;
  }
</style>