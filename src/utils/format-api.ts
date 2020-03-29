/**
 * 格式化列表接口数据
 * @param {Object} res 接口返回数据
 * @return {{total: number, data: []}}
 */
export function formatAPIList(res) {
  if (res && res.data) {
    if (Array.isArray(res.data)) {
      return {
        total: res.data.length,
        data: res.data,
      };
    } else {
      return {
        total: res.data.total,
        data: res.data.records,
      };
    }
  } else {
    return {
      total: 0,
      data: [],
    };
  }
}

/**
 * 格式化详情接口数据
 * @param {Object} res 接口返回数据
 * @return {Object}
 */
export function formatAPIDetail(res) {
  if (res && res.data) {
    return res.data;
  } else {
    return {};
  }
}

/**
 * 格式化操作接口数据
 * @param {Object} res 接口返回数据
 * @return {Boolean}
 */
export function formatAPIHandle(res) {
  return (res && res.code === 200);
}
