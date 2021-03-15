import { v4 as uuidv4 } from "uuid";

export function getTempId() {
  let userTempId = localStorage.getItem("USERTEMP_ID");
  if (userTempId) return userTempId;
  //如果没有uuid则创建
  userTempId = uuidv4();
  //将创建好的uuid添加到缓存中
  localStorage.setItem("USERTEMP_ID", userTempId);
  return userTempId;
}

//将token缓存到浏览器中
export function saveToken(token) {
  localStorage.setItem("TOKEN_KEY", token);
}

//将token缓存到浏览器中
export const getToken = () => localStorage.getItem("TOKEN_KEY") || "";
//将浏览器缓存的token删除
export const removeToken = () => localStorage.removeItem("TOKEN_KEY");
