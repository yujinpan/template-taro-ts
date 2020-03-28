/**
 * 本地数据管理基类
 * @description 如果有数据有过期时间并且未过期返回本地数据，否则返回 null
 *
 * @method get 获取数据
 * @method set 设置数据
 * @method clear 清理数据
 *
 * @example
 * const userToken = new LocalDataManager('USER_TOKEN');
 * userToken.set({id: 1, name: 1, token: 'test'});
 * userToken.get();
 */

import Taro from '@tarojs/taro';

// polyfill
const localStorage = {
  getItem(key) {
    return Taro.getStorageSync(key);
  },
  setItem(key, data) {
    Taro.setStorageSync(key, data);
  },
  removeItem(key) {
    Taro.removeStorageSync(key);
  },
  clear() {
    Taro.clearStorageSync();
  },
};

export class LocalDataManager {
  name = '';
  constructor(name) {
    // 抛出重复的名称错误
    const existNames = LocalDataManager._existNames;
    if (existNames.includes(name)) {
      throw `本地缓存错误：${name} 名称重复`;
    } else {
      existNames.push(name);
    }

    this.name = name;
  }

  /**
   * 更新数据
   */
  update(data) {
    const old = this.get();
    if (old && old instanceof Object && data instanceof Object) {
      data = Object.assign(old, data);
    }
    this.set(data);
  }

  /**
   * 获取
   * @returns {string/null} 如果有数据有过期时间并且未过期返回本地数据，否则返回 null
   */
  get() {
    const data = getLocalData(this.name);
    if (data && (data.expires > Date.now() || !data.expires)) {
      return data;
    } else {
      this.clear();
      return null;
    }
  }

  // 设置
  set(data) {
    setLocalData(this.name, data);
  }

  // 清理
  clear() {
    clearLocalData(this.name);
  }
}
LocalDataManager._existNames = [];

/**
 * 校验版本号
 * @param {String} localName 本地版本号存储的 localStorage 名称
 * @param {String} remoteVersion 远程版本号
 */
export function checkLocalVersion(localName, remoteVersion) {
  const localVersion = getLocalData(localName);
  if (!localVersion || localVersion !== String(remoteVersion)) {
    localStorage.clear();
    setLocalData(localName, remoteVersion);
    return false;
  } else {
    return true;
  }
}

/**
 * 获取本地数据
 * @param {string} name localStorage 名称
 */
function getLocalData(name) {
  const data = localStorage.getItem(name);
  if (data) {
    return JSON.parse(data);
  } else {
    return data;
  }
}

/**
 * 设置本地数据
 * @param {string} name localStorage 名称
 * @param {*} data 存储的内容
 */
function setLocalData(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

/**
 * 清理本地数据
 * @param {string} name localStorage 名称
 */
function clearLocalData(name) {
  localStorage.removeItem(name);
}
