import moment from 'moment';

/**
 * 格式化时间戳
 * @param {Number} number 例如：Date.now()
 * @param {String} [format] 时间格式
 * @return {string}
 */
export function formatDateNumber(number, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment(number).format(format);
}
