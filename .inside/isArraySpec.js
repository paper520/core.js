import isArrayLike from './isArrayLike';
import isString from '../isString';

/**
 * 和isArrayLike类似，不过特别排除以下类型：
 *  1.字符串
 *
 * @private
 * @param {any} value 需要判断的值
 * @returns {boolean} 如果是返回true，否则返回false
 */

export default function (value) {

    return isArrayLike(value) && !isString(value);

};
