<template>
  <div>
    <h1>分类</h1>
    <scroll>
      <ul>
        <button @click="test">按钮</button>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
        <li>21</li>
        <li>22</li>
        <li>23</li>
        <li>24</li>
        <li>25</li>
      </ul>
      <ul>
        <button @click="test">按钮</button>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
        <li>21</li>
        <li>22</li>
        <li>23</li>
        <li>24</li>
        <li>25</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
// import BScroll from 'better-scroll'
  import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'category',
  data(){
    return {
      scroll: null
    }
  },
  components:{
    Scroll
  },
  created(){

  },
  // 进行DOM操作要在mounted里进行，不能在created
  mounted(){

  },
  methods:{
    // 设置 click: true, 才可以点击
    test(){
      console.log(456)
    }
  }
}
</script>

<style>
  .wrapper{
    height: 300px;
    background-color: #cdc;
    overflow: hidden;
  }
</style>