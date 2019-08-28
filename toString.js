import isSymbol from './.inside/isSymbol';
import isString from './.inside/isString';

const symbolToString = Symbol.prototype.toString;
const hasOwnProperty = Object.prototype.hasOwnProperty;
const INFINITY = 1 / 0;

/**
 * 把一个值变成字符串。
 *
 * @since V0.1.1
 * @public
 * @param {*} value 需要判断类型的值
 * @returns {string} 返回转换后的字符串
 * @example
 *
 * toString(null)
 * // => ''
 *
 * toString(-0)
 * // => '-0'
 *
 * toString([1, 2, 3])
 * // => '[1,2,3]'
 */
function toString(value) {

    // 如果value是null或者undefined，都返回""
    if (value == null) {
        return '';
    }

    // 如果是普通的字符串
    if (typeof value === 'string') {
        return value;
    }

    // 如果字符串对象
    if (isString(value)) {
        return value + "";
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
        return symbolToString ? symbolToString.call(value) : "";
    }

    // 特殊类型外的，可迭代数据
    let temp = "";
    for (let key in value) {
        // ES并没有保护 hasOwnProperty 属性名，因此使用 Object 原型上的 hasOwnProperty 属性
        if (hasOwnProperty.call(value, key))
            temp += ",\"" + toString(key) + "\":" + toString(value[key]);
    }
    if (temp !== "") {
        temp = temp.replace(/^,/, "");
        return "{" + temp + "}";
    }

    const result = `${value}`;
    // 针对数字-0特殊除了，防止变成字符串"0"
    return (result === '0' && 1 / value === -INFINITY) ? "-0" : result;
};

export default toString;
