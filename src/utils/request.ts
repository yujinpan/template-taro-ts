import Taro from "@tarojs/taro";
import { showToast } from "./message";
import { localDataUser } from './local-data';

/**
 * 封装请求
 * @description
 *   - 处理 token
 *   - 处理错误
 */
export default async function request(options: Taro.request.Option) {
  // 处理 token
  const localData = localDataUser.get();
  if (options.data && localData && localData.token) {
    options.data.token = localData.token;
  }

  // 发送请求
  const res = await Taro.request(options);

  // 处理错误
  if (res && res.data && res.data.code !== 200) {
    showToast(res.data.message || "请求数据失败");
  }

  return res.data;
}
