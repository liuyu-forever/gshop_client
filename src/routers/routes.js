//引入路由组件(按需引入的方式)
const Home = () => import("@/pages/Home");
const Login = () => import("@/pages/Login");
const Register = () => import("@/pages/Register");
const Search = () => import("@/pages/Search");
const Detail = () => import("@/pages/Detail");
const AddCartSuccess = () => import("@/pages/AddCartSuccess");
const ShopCart = () => import("@/pages/ShopCart");
const Center = () => import("@/pages/Center");
const Pay = () => import("@/pages/Pay");
const Trade = () => import("@/pages/Trade");
const PaySuccess = () => import("@/pages/PaySuccess");

//引入Center组件的二级组件
const MyOrder = () => import("@/pages/Center/MyOrder");
const OrderDetail = () => import("@/pages/Center/OrderDetail");
const Refund = () => import("@/pages/Center/Refund");
const RefundList = () => import("@/pages/Center/RefundList");

//导出路由表
export default [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
    meta: {
      isHideFooter: true, //控制底部组件是否隐藏
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isHideFooter: true,
    },
  },
  {
    path: "/search/:keyword?",
    name: "search",
    //path: "/search",
    component: Search,
  },
  {
    path: "/detail/:skuId",
    name: "detail",
    component: Detail,
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: AddCartSuccess,
  },
  {
    path: "/shopcart",
    name: "shopcart",
    component: ShopCart,
  },
  {
    path: "/center",
    name: "center",
    component: Center,
    //配置子路由
    children: [
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "orderdetail/:orderId",
        component: OrderDetail,
      },
      {
        path: "refund",
        component: Refund,
      },
      {
        path: "refundlist",
        component: RefundList,
      },
      {
        //center根路径重定向
        path: "",
        redirect: "myorder",
      },
    ],
  },
  {
    path: "/pay",
    name: "pay",
    component: Pay,
    beforeEnter: (to, from, next) => {
      if (from.path === "/trade" || from.path === "/center/myorder") {
        next();
      } else {
        next("/trade");
      }
    },
  },
  {
    path: "/paysuccess",
    name: "paysuccess",
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      if (from.path === "/pay") {
        next();
      } else {
        next("/pay");
      }
    },
  },
  {
    path: "/trade",
    name: "trade",
    component: Trade,
    beforeEnter: (to, from, next) => {
      if (from.path === "/shopcart") {
        next();
      } else {
        next("/shopcart");
      }
    },
  },
  // 组件通信高级
  {
    path: "/communication",
    component: () => import("@/pages/Communication/Communication"),
    children: [
      // 原生事件和自定义事件的技术点的组件
      {
        path: "event",
        component: () => import("@/pages/Communication/EventTest/EventTest"),
        meta: {
          isHideFooter: true,
        },
      },
      // v-model的本质的技术点组件
      {
        path: "model",
        component: () => import("@/pages/Communication/ModelTest/ModelTest"),
        meta: {
          isHideFooter: true,
        },
      },
      // .sync 修饰符的技术点组件
      {
        path: "sync",
        component: () => import("@/pages/Communication/SyncTest/SyncTest"),
        meta: {
          isHideFooter: true,
        },
      },
      // $attrs和$listeners技术点组件
      {
        path: "attrs-listeners",
        component: () =>
          import("@/pages/Communication/AttrsListenersTest/AttrsListenersTest"),
        meta: {
          isHideFooter: true,
        },
      },
      // $children和$parent技术点组件
      {
        path: "children-parent",
        component: () =>
          import("@/pages/Communication/ChildrenParentTest/ChildrenParentTest"),
        meta: {
          isHideFooter: true,
        },
      },
      // 作用域插槽的技术点组件
      {
        path: "scope-slot",
        component: () =>
          import("@/pages/Communication/ScopeSlotTest/ScopeSlotTest"),
        meta: {
          isHideFooter: true,
        },
      },
      // provide和inject 技术S点组件
      {
        path: "provide-inject",
        component: () =>
          import("@/pages/Communication/ProvideInjectTest/ProvideInjectTest"),
        meta: {
          isHideFooter: true,
        },
      },
    ],
  },
  {
    path: "/home",
    redirect: "/",
  },
];
