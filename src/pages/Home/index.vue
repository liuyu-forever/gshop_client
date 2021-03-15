<template>
  <div>
    <!-- 商品分类导航 -->
    <TypeNav></TypeNav>

    <!--列表-->
    <ListContainer></ListContainer>

    <!--今日推荐-->
    <TodayRecommend></TodayRecommend>

    <!-- 商品排行 -->
    <Rank></Rank>

    <!-- 猜你喜欢 -->
    <Like></Like>

    <!--楼层-->
    <Floor v-for="(value) in floors" :key="value.id" :floor="value"></Floor>

    <!--商标-->
    <Brand></Brand>
  </div>
</template>
<script>
//引入所需的子组件
import ListContainer from "./ListContainer/index";
import TodayRecommend from "./TodayRecommend/index";
import Rank from "./Rank/index";
import Like from "./Like/index";
import Floor from "./Floor/index";
import Brand from "./Brand/index";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    //分发actions,请求接口获取数据
    this.$store.dispatch("getBanners"); //获取轮播图数据
    this.$store.dispatch("getRecommends"); //获取今日推荐数据
    this.$store.dispatch("getFloors"); //获取楼层数据
  },
  computed: {
    ...mapState({ floors: state => state.home.floors }),
  },
};
</script>
<style lang="less" scoped></style>
