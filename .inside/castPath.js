import isKey from './isKey';
import stringToPath from './stringToPath';

/**
 * 把属性字符串统一变成数组（数组每个值是一个简单的属性）
 *
 * @private
 * @param {Array|string} path 属性或路径
 * @param {Object} object 操作的对象
 * @returns {Array} 返回属性数组
 */
export default function (value, object) {
    if (Array.isArray(value)) {
        return value;
    }
    return isKey(value, object) ? [value] : stringToPath(value);

};
