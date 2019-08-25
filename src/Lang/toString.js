import isSymbol from './isSymbol';

const symbolToString = Symbol.prototype.toString;
const INFINITY = 1 / 0;

/**
 * 把一个值变成字符串。
 *
 * @since Sun Aug 25 2019 GMT+0800
 * @public
 * @param {*} value 需要判断类型的值
 * @returns {string} 返回转换后的字符串
 */
function toString(value) {

    // 如果value是null或者undefined，都返回""
    if (value == null) {
        return '';
    }

    if (typeof value === 'string') {
        return value;
    }

    // 如果是数组，就展开(多层)
    if (Array.isArray(value)) {
        let temp = [];
        for (let i = 0; i < value.length; i++) {
            // 因为元素也可能是各种类型，递归转换
            temp[i] = toString(value[i]);
        }
        return `[${temp}]`;
    }

    if (isSymbol(value)) {
        return symbolToString ? symbolToString(value) : "";
    }

    const result = `${value}`;
    // 针对数字-0特殊除了，防止变成字符串"0"
    return (result === '0' && 1 / value === -INFINITY) ? "-0" : result;
};

export default toString;
