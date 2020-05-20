<template>
  <div>
    <h1>分类</h1>
    <div class="wrapper">
      <ul class="content">
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
        <li>26</li>
        <li>27</li>
        <li>28</li>
        <li>29</li>
        <li>30</li>
        <li>31</li>
        <li>32</li>
        <li>33</li>
        <li>34</li>
        <li>35</li>
        <li>36</li>
        <li>37</li>
        <li>38</li>
        <li>39</li>
        <li>40</li>
        <li>41</li>
        <li>42</li>
        <li>43</li>
        <li>44</li>
        <li>45</li>
        <li>46</li>
        <li>47</li>
        <li>48</li>
        <li>49</li>
        <li>50</li>
      </ul>
    </div>


  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'category',
  data(){
    return {
      bscroll: null
    }
  },
  created(){

  },
  // 进行DOM操作要在mounted里进行，不能在created
  mounted(){

    this.bscroll = new BScroll(document.querySelector('.wrapper'), {
      // 默认情况下BScroll是不可以实时监听滚动位置的
      /*
        probe: 监测
        0,1都不会实时监测滚动位置
        2在手指滚动的过程会监测，手机离开后的惯性滚动不监测
        3只要是滚动都会监测
      */
      probeType: 3,
      /*
        默认情况下BScroll禁止移动端的原生js点击事件
        设置 click: true, 才可以点击
      */
      click: true,

      /*
        这个配置用于做上拉操作，默认为 false
      */
      pullUpLoad: true,
    })

    /*
      0,1都不会实时监测滚动位置，控制台不会有输出
      2手指滚动时控制台有数据，离开后没有
      3只要是滚动就有数据
    */
    // this.bscroll.on('scroll', (position) => {
    //   console.log(position)
    // });

    /*
      上拉操作
    */
    this.bscroll.on('pullingUp', (position) => {
      console.log('上拉操作')

      // 如果不加下面这一行，只会触发一次上拉操作
      // 加个定时器，防止一直上拉加载。至少1秒才能进行一次上拉加载
      setTimeout(() => {
        this.bscroll.finishPullUp()
      }, 1000)

    });

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