<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="hideAllShop" @mouseenter="showAllShop">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" @click="toSearch" v-show="isShow">
          <div class="all-sort-list2">
            <!-- 遍历一级分类信息 -->
            <div
              class="item"
              v-for="(valueC1, index) in baseCategoryList"
              :key="valueC1.categoryId"
              :class="{ item_on: currentIndex === index }"
              @mouseenter="showSubCategroy(index)"
            >
              <h3>
                <a
                  href="javascript:;"
                  :data-categoryName="valueC1.categoryName"
                  :data-category1Id="valueC1.categoryId"
                  >{{ valueC1.categoryName }}</a
                >
                <!-- <router-link
                  :to="{
                    path: '/search',
                    query: {
                      categoryName: valueC1.categoryName,
                      category1Id: valueC1.categoryId,
                    },
                  }"
                  >{{ valueC1.categoryName }}</router-link
                > -->
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <!-- 遍历二级分类信息 -->
                  <dl
                    class="fore"
                    v-for="valueC2 in valueC1.categoryChild"
                    :key="valueC2.categoryId"
                  >
                    <dt>
                      <!-- <a href="javascript:;">{{ valueC2.categoryName }}</a> -->
                      <a
                        href="javascript:;"
                        :data-categoryName="valueC2.categoryName"
                        :data-category2Id="valueC2.categoryId"
                        >{{ valueC2.categoryName }}</a
                      >
                      <!-- <router-link
                        :to="{
                          path: '/search',
                          query: {
                            categoryName: valueC2.categoryName,
                            category2Id: valueC2.categoryId,
                          },
                        }"
                        >{{ valueC2.categoryName }}</router-link
                      > -->
                    </dt>
                    <dd>
                      <!-- 遍历三级分类信息 -->
                      <em
                        v-for="valueC3 in valueC2.categoryChild"
                        :key="valueC3.categoryId"
                      >
                        <!-- <a href="javascript:;">{{ valueC3.categoryName }}</a> -->
                        <a
                          href="javascript:;"
                          :data-categoryName="valueC3.categoryName"
                          :data-category3Id="valueC3.categoryId"
                          >{{ valueC3.categoryName }}</a
                        >
                        <!-- <router-link
                          :to="{
                            path: '/search',
                            query: {
                              categoryName: valueC3.categoryName,
                              category3Id: valueC3.categoryId,
                            },
                          }"
                          >{{ valueC3.categoryName }}</router-link
                        > -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
//引入vuex的辅助函数
import { mapState } from "vuex";
import throttle from "lodash/throttle"; //按需引入节流函数
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -2,
      isShow: true,
    };
  },
  mounted() {
    if (this.$route.path !== "/") {
      this.isShow = false;
    }
  },
  computed: {
    //获取home组件的state数据
    ...mapState({ baseCategoryList: state => state.home.baseCategoryList }),
  },
  methods: {
    showSubCategroy: throttle(function(index) {
      if (this.currentIndex !== -2) {
        //如果currentIndex值不为-2,就进行保存索引的操作
        this.currentIndex = index;
      }
    }, 200),
    //点击一级分类/二级分类/三级分类的信息名字,进行路由的跳转,并传递数据(事件委托)
    toSearch(e) {
      //获取此时点击的标签名称
      const nodeTarget = e.target.nodeName;
      if (nodeTarget === "A") {
        //获取当前点击的a标签中所有存储的数据
        const {
          category1id,
          category2id,
          category3id,
          categoryname,
        } = e.target.dataset;
        //创建query对象,准备进行路由跳转
        const query = { categoryName: categoryname };
        //获取到不同级别的a标签中的categoryid
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        //进行路由跳转
        const { path, params } = this.$route;
        if (path.indexOf("/search") === 0) {
          this.$router.replace({ path, params, query });
        } else {
          this.$router.replace({ path: "/search", query });
        }

        this.currentIndex = -2;
      }
    },
    showAllShop() {
      this.currentIndex = -1;
      this.isShow = true;
    },
    hideAllShop() {
      this.currentIndex = -2; //鼠标移出父级元素时,不保存索引
      if (this.$route.path !== "/") {
        this.isShow = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: gray;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
