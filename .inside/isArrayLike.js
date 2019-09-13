import isLength from './isLength';

/**
 * 判断是不是一个类似数组的对象，是否可以通过length迭代
 *
 *
 * @private
 * @param {any} value 需要判断的值
 * @returns {boolean} 如果是返回true，否则返回false
 */

export default function (value) {

    return value != null && typeof value != 'function' && isLength(value.length);

};
