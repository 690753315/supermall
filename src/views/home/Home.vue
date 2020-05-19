<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">导航栏</div>
    </nav-bar>

    <!-- 用props 父组件给子组件动态传值 -->
    <home-swiper :banners="banners"></home-swiper>

    <recommend-view :recommends="recommends"></recommend-view>

    <feature-view></feature-view>

    <tab-control :titles="['流行', '新款', '精选']"></tab-control>

    <!-- ul>li{列表$}*100 先用100个列表填充空间，不然高度不够，不能向下滑 -->
    <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表11</li>
      <li>列表12</li>
      <li>列表13</li>
      <li>列表14</li>
      <li>列表15</li>
      <li>列表16</li>
      <li>列表17</li>
      <li>列表18</li>
      <li>列表19</li>
      <li>列表20</li>
      <li>列表21</li>
      <li>列表22</li>
      <li>列表23</li>
      <li>列表24</li>
      <li>列表25</li>
      <li>列表26</li>
      <li>列表27</li>
      <li>列表28</li>
      <li>列表29</li>
      <li>列表30</li>
      <li>列表31</li>
      <li>列表32</li>
      <li>列表33</li>
      <li>列表34</li>
      <li>列表35</li>
      <li>列表36</li>
      <li>列表37</li>
      <li>列表38</li>
      <li>列表39</li>
      <li>列表40</li>
      <li>列表41</li>
      <li>列表42</li>
      <li>列表43</li>
      <li>列表44</li>
      <li>列表45</li>
      <li>列表46</li>
      <li>列表47</li>
      <li>列表48</li>
      <li>列表49</li>
      <li>列表50</li>
      <li>列表51</li>
      <li>列表52</li>
      <li>列表53</li>
      <li>列表54</li>
      <li>列表55</li>
      <li>列表56</li>
      <li>列表57</li>
      <li>列表58</li>
      <li>列表59</li>
      <li>列表60</li>
      <li>列表61</li>
      <li>列表62</li>
      <li>列表63</li>
      <li>列表64</li>
      <li>列表65</li>
      <li>列表66</li>
      <li>列表67</li>
      <li>列表68</li>
      <li>列表69</li>
      <li>列表70</li>
      <li>列表71</li>
      <li>列表72</li>
      <li>列表73</li>
      <li>列表74</li>
      <li>列表75</li>
      <li>列表76</li>
      <li>列表77</li>
      <li>列表78</li>
      <li>列表79</li>
      <li>列表80</li>
      <li>列表81</li>
      <li>列表82</li>
      <li>列表83</li>
      <li>列表84</li>
      <li>列表85</li>
      <li>列表86</li>
      <li>列表87</li>
      <li>列表88</li>
      <li>列表89</li>
      <li>列表90</li>
      <li>列表91</li>
      <li>列表92</li>
      <li>列表93</li>
      <li>列表94</li>
      <li>列表95</li>
      <li>列表96</li>
      <li>列表97</li>
      <li>列表98</li>
      <li>列表99</li>
      <li>列表100</li>
    </ul>
  </div>
</template>

<script>
  // 导航栏
  import NavBar from 'components/common/navbar/NavBar'

  // 轮播
  import HomeSwiper from 'views/home/childComps/HomeSwiper.vue'
  // 推荐
  import RecommendView from 'views/home/childComps/RecommendView.vue'
  // 本周流行
  import FeatureView from 'views/home/childComps/FeatureView.vue'
  // 流行、新款、精选 按钮
  import TabControl from 'components/content/tabControl/TabControl'

  // 网络请求
  import {getHomeMultidata, getHomeGoods} from 'network/home'

  export default {
    name: 'home',
    data() {
      return {
        banners: [],
        recommends: [],
        // 商品列表数据
        goods: {
          // 流行
          pop: {
            page: 0,
            list: []
          },
          // 新款
          new: {
            page: 0,
            list: []
          },
          // 精选
          sell: {
            page: 0,
            list: []
          },
        }
      }
    },
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl
    },
    created(){
      // 为了简化created()里面的代码，把请求放到methods里进行，在created里面调用方法
      this.getHomeMultidata()

      this.getHomeGoods('pop', 1)
    },
    methods: {
      getHomeMultidata(){
        getHomeMultidata().then( res => {
          // console.log(res)
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
      },
      getHomeGoods(type, page){
        getHomeGoods(type, page).then( res => {
          this.goods.pop.list = res.data.data.list
        })
      }
    }
  }
</script>

<style>
  #home{
    padding-top: var(--nav-bar-height);
  }

  .home-nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    box-shadow: 0 1px 1px rgba(100,100,100,0.1);

    /* 将导航栏固定在顶部 */
    position: fixed;
    top: 0;
    /* 设置宽度100% */
    left: 0;
    right: 0;

    z-index: 9;
  }


</style>