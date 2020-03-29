import { stringify } from 'qs';
import Taro from '@tarojs/taro';

import { localDataUser } from './local-data';

// 快捷查找 pages 的 path
export const pages = require('@/src/pages.json');

// 跳转守卫（判断是否登陆）
export function targetGuard(toPath) {
  const data = localDataUser.get();
  if (data) {
    // 有登陆信息，则跳转至目标
    targetTo(toPath);
  } else {
    // 没有登陆信息，跳转至登陆
    targetTo(pages.index);
  }
}

// 跳转与传参 - 向右
export function targetTo(path: string, params?: object) {
  Taro.navigateTo({
    url: createUrl(path, params)
  });
}

// 跳转与传参 - 向左
export function targetBack(number = 1) {
  Taro.navigateBack({
    delta: number
  });
}

// 跳转与传参 - 向右替换
export function targetReplace(path: string, params?: object) {
  Taro.redirectTo({
    url: createUrl(path, params)
  });
}

// 关闭其他所有页面
export function targetReLaunch(path: string, params?: object) {
  Taro.reLaunch({
    url: createUrl(path, params)
  });
}

function createUrl(path: string, params?: object) {
  return path + params ? '?' + stringify(params) : '';
}
