<template>
  <swiper
    ref="mySwiper"
    :options="{
      slidesPerView: 5,  //一屏显示多少图片
      slidesPerGroup: 5, //每次移动多少张图片
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    }"
  >
    <swiper-slide v-for="(value, index) in skuImageList" :key="value.id">
      <img
        :src="value.imgUrl"
        :alt="value.imgName"
        @click="changeCurrentIndex(index)"
        :class="{active: currentIndex===index}"
      />
    </swiper-slide>

    <div class="swiper-pagination" slot="pagination"></div>

    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    ...mapGetters(["skuImageList"])
  },
  methods: {
    //点击应用选中效果
    changeCurrentIndex(index) {
      this.currentIndex = index;
      this.$emit("changecurrentIndex", index)
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    // width: 56px;
    // height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
