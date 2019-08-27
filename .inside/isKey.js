import isSymbol from './isSymbol';

/**
 * 判断是不是一个对象上的属性
 *
 * @private
 * @param {Array|string} path 属性或路径
 * @param {Object} object 操作的对象
 * @returns {boolean} 如果是返回true，否则返回false
 */

export default function (value, object) {

    if (Array.isArray(value)) {
        return false;
    }

    const type = typeof value;
    if (type == 'number' || type == 'boolean' || value == null || isSymbol(value)) {
        return true;
    }

    return (object !== null && value in Object(object)) || /^\w*$/.test(value);
};
