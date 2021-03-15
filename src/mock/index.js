//引入Mock
import Mock from "mockjs";
//引入今日推荐的数据
import recommends from "./recommends.json";
//引入楼层的数据
import floors from "./floors.json";
//生成随机的数据
Mock.mock("/mock/recommends", { code: 200, data: recommends, message: "ok" });
Mock.mock("/mock/floors", { code: 200, data: floors, message: "ok" });

